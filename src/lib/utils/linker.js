/**
 * @template T
 * @typedef {Object} StepNode
 * @property {T} value
 * @property {StepNode<T> | null} next
 * @property {StepNode<T> | null} prev
 */

/**
 * @template T
 * @typedef {StepNode<T> | undefined | null} MaybeStepNode
 */

/**
 * @template T
 * @param {T} value
 *
 */
function createNode(value) {
	let prev = null;
	let next = null;

	return /** @type {StepNode<T>} */ ({
		value,
		prev,
		next
	});
}
/**
 * @template T
 */
function createLink() {
	let size = 0;
	/** @type {MaybeStepNode<T>} */
	let head;
	/** @type {MaybeStepNode<T>} */
	let tail;

	return /** @type {const} */ ({ add, getStep });

	/**
	 * @param {T} value
	 */
	function add(value) {
		const entry = createNode(value);

		if (size) {
			tail.next = entry;
			entry.prev = tail;
			tail = entry;
		} else {
			head = entry;
			tail = entry;
		}

		size++;
		return entry;
	}
	/**
	 *
	 * @param {number} pos
	 */
	function getStep(pos) {
		let current = head;
		const _size = size;

		let count = 1;
		const msg = 'fail';

		if (_size === 0 || pos < 1 || pos > _size) {
			throw new Error(msg);
		}

		while (count < pos) {
			current = current.next;
			count++;
		}

		return /** @type {StepNode<T>} */ (current);
	}
}

/**
 * @template T
 * @param {T[]} items
 */
export function createLinkFromArray(items) {
	/** @type {ReturnType<typeof createLink<T>} */
	const link = createLink();

	for (const item of items) {
		link.add(item);
	}

	return link;
}
