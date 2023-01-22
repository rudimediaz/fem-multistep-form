import { derived, writable, get } from 'svelte/store';

export function useTransition(timeout = 1) {
	const pending = writable(false);
	const isPending = derived(pending, (v) => v);

	const utils = /** @type {const} */ ({ skip, setPendingUntil });
	return /** @type {const} */ ([isPending, startTransition, utils]);
	/**
	 *
	 * @param {()=>void} routine
	 */
	function startTransition(routine) {
		setPendingUntil(
			new Promise((resolve) => {
				routine();
				setTimeout(() => {
					resolve();
				}, timeout);
			})
		);
	}

	function skip() {
		if (get(pending) === true) {
			pending.set(false);
		}
	}
	/**
	 *
	 * @param {Promise<void>} routine
	 */
	function setPendingUntil(routine) {
		pending.set(true);
		routine.then(() => {
			pending.set(false);
		});
	}
}
