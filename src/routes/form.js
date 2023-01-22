//@ts-check
import { addons, plans } from '$lib/assets/content';
import { derived, writable } from 'svelte/store';

/**
 * @typedef { Object } HasPrice
 * @property {number} price
 */

const planMap = new Map(plans.map((plan) => [plan.id, plan]));
/**
 *
 *
 */
export function useAnnual() {
	const yearly = writable(false);

	return yearly;
}

/**
 *
 * @param {import('svelte/store').Writable<boolean>} yearly
 */
export function usePlan(yearly) {
	const selectedPlanId = writable(plans[0].id);

	const planList = derived(yearly, (v) => {
		return plans.map(transformHasPrice(v));
	});

	const planSummary = derived([selectedPlanId, yearly], ([id, y]) => {
		const item = getPlan(id);

		return { ...item, price: sumYearly(y)(item.price) };
	});

	const planSummaryDisplay = derived([planSummary, yearly], ([item, y]) => {
		return { ...item, price: formatYearly(y)(item.price) };
	});

	return /** @type {const} */ ({ selectedPlanId, planList, planSummaryDisplay, planSummary });
}

/**
 *
 * @param {import('svelte/store').Writable<boolean>} yearly
 */
export function useAddons(yearly) {
	/** @type {import('svelte/store').Writable<string[]>} */
	const selectedAddonIds = writable([]);

	const addonList = derived(yearly, (v) => {
		return addons.map(transformHasPrice(v));
	});

	const addonsSummary = derived([selectedAddonIds, yearly], ([ids, y]) => {
		const items = addons.filter((addon) => ids.includes(addon.id));

		if (items.length !== 0) {
			return items.map((item) => {
				return { ...item, price: sumYearly(y)(item.price) };
			});
		}

		return [];
	});

	const addonSummaryDisplay = derived([addonsSummary, yearly], ([items, y]) => {
		return items.map((item) => {
			return { ...item, price: formatYearly(y)(item.price) };
		});
	});

	return /** @type {const}  */ ({
		selectedAddonIds,
		addonList,
		addonsSummary,
		addonSummaryDisplay
	});
}

/**
 * @template {HasPrice} T
 * @template {HasPrice} U
 * @param {import('svelte/store').Readable<T>} planSummary
 * @param {import('svelte/store').Readable<U[]>} addonsSummary
 * @param {import('svelte/store').Writable<boolean>} yearly
 */
export function useAggregation(planSummary, addonsSummary, yearly) {
	const totalPrice = derived([planSummary, addonsSummary], ([plan, addons]) => {
		if (addons.length === 0) {
			return plan.price;
		}

		return addons.reduce((a, c) => {
			return a + c.price;
		}, plan.price);
	});

	const formattedTotalPrice = derived([totalPrice, yearly], ([v, y]) => {
		return formatYearly(y)(v);
	});

	return /** @type {const} */ ({ totalPrice, formattedTotalPrice });
}

/**
 *
 * @param {boolean} yearly
 */
function sumYearly(yearly) {
	return sum;
	/**
	 *
	 * @param {number} value
	 */
	function sum(value) {
		if (yearly) {
			return value * (12 - 2);
		}

		return value;
	}
}

/**
 *
 * @param {boolean} yearly
 */
function formatYearly(yearly) {
	return fmt;
	/**
	 * @template {string | number} T
	 * @param {T} value
	 */
	function fmt(value) {
		if (yearly) {
			return `$${value}/yr`;
		}

		return `$${value}/mo`;
	}
}

/**
 *
 * @param {boolean} yearly
 */
function transformHasPrice(yearly) {
	const fmt = formatYearly(yearly);
	const sum = sumYearly(yearly);
	return transform;
	/**
	 * @template {HasPrice} T
	 * @param {T} item
	 * @returns {Omit<T,'price'> & {price : string}}
	 */
	function transform(item) {
		return { ...item, price: fmt(sum(item.price)) };
	}
}

/**
 *
 * @param {string} id
 */
function getPlan(id) {
	const item = planMap.get(id);

	return /** @type {import('$lib/assets/content').PlanData} */ (item);
}
