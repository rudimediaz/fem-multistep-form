import { createLinkFromArray } from '$lib/utils/linker';
import { derived, get, writable } from 'svelte/store';

/**
 * @template T
 * @param {T[]} items
 */
export function useStepper(items, init = 1) {
	const range = new Array(items.length).fill(0).map((_v, i) => i + 1);
	const stepLink = createLinkFromArray(items);

	const stepper = writable(stepLink.getStep(init));

	const current = derived(stepper, (v) => v.value);
	const prev = derived(stepper, (v) => v.prev?.value);
	const next = derived(stepper, (v) => v.next?.value);
	const last = derived(stepper, (v) => v.next === null);

	return /** @type {const} */ ({
		current,
		prev,
		next,
		goToNext,
		goToPrev,
		goAt,
		last
	});

	function goToNext() {
		const currentStepper = get(stepper);
		if (currentStepper.next) {
			//@ts-expect-error
			stepper.set(currentStepper.next);
		}
	}

	/**
	 *
	 * @param {number} pos
	 */
	function goAt(pos) {
		const last = range[range.length - 1];
		const first = range[0];

		if (pos > last) {
			stepper.set(stepLink.getStep(last));
		} else if (pos < first) {
			stepper.set(stepLink.getStep(first));
		} else {
			stepper.set(stepLink.getStep(pos));
		}
	}

	function goToPrev() {
		const currentStepper = get(stepper);

		if (currentStepper.prev) {
			stepper.set(currentStepper.prev);
		}
	}
}
