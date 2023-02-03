<script>
	import TextField from '$lib/components/TextField.svelte';
	import { derived, writable } from 'svelte/store';
	import debounce from 'lodash-es/debounce';
	import { createEventDispatcher } from 'svelte';

	/**
	 * @typedef {{ timestamp : number, next : number } StepLog;
	 */

	const USER_NAME = 'user_name';
	const USER_EMAIL = 'user_email';
	const USER_PHONE = 'user_phone';
	const IS_REQUIRED = 'This field is required';
	const PATTERN_MISMATCH = 'Please insert the correct format';

	const dispatch = createEventDispatcher();

	/**@type {string} */
	export let name;
	/** @type {string} */
	export let email;
	/** @type {string} */
	export let phone;
	/** @type {StepLog} */
	export let stepLog;
	/** @type {HTMLInputElement | undefined} */
	let nameEl;
	/** @type {HTMLInputElement | undefined} */
	let emailEl;
	/** @type {HTMLInputElement | undefined} */
	let phoneEl;

	const invalid = writable({
		name: false,
		email: false,
		phone: false
	});

	const invalidMessage = writable({
		name: IS_REQUIRED,
		email: IS_REQUIRED,
		phone: IS_REQUIRED
	});

	const validities = derived(invalid, (v) => {
		const invalids = Object.values(v);

		return invalids.every((invalid) => invalid === false);
	});

	const debouncedCheckValidity = debounce(checkValidity, 1000, {
		maxWait: 5000
	});

	$: ((currentStepLog) => {
		const targets = [nameEl, emailEl, phoneEl];

		for (const target of targets) {
			if (
				currentStepLog.timestamp !== 0 &&
				currentStepLog.next === 2 &&
				target
			) {
				checkValidity(target);
			}
		}
	})(stepLog);

	// tracking individual invalid state
	$: ((_x, _y, _z) => {
		dispatch('aftervaliditycheck', {
			isValid: $validities
		});
	})($invalid.name, $invalid.email, $invalid.phone);

	function handleInput(e) {
		debouncedCheckValidity(e.target);
	}

	function handleBlur(e) {
		checkValidity(e.target);
	}

	function handleInvalid(e) {
		console.log(e.target.validity);

		const getMessage = () => {
			if (
				e.target.validity.patternMismatch ||
				e.target.validity.typeMismatch
			) {
				return PATTERN_MISMATCH;
			}

			return IS_REQUIRED;
		};

		updateInvalid(e.target, true, getMessage());
	}

	function checkValidity(target) {
		const isValid = target.checkValidity();

		if (isValid) {
			updateInvalid(target, false);
		}
	}

	function updateInvalid(target, isValid, message) {
		switch (target.name) {
			case USER_NAME:
				$invalid.name = isValid;
				$invalidMessage.name = message;
				break;
			case USER_EMAIL:
				$invalid.email = isValid;
				$invalidMessage.email = message;
				break;
			case USER_PHONE:
				$invalid.phone = isValid;
				$invalidMessage.phone = message;
				break;
		}
	}
</script>

<div class="grid gap-y-4">
	<TextField
		bind:ref={nameEl}
		required
		id="user-name"
		label="Name"
		name={USER_NAME}
		placeholder="e.g. Stephen King"
		bind:value={name}
		on:blur={handleBlur}
		on:invalid={handleInvalid}
		on:input={handleInput}
		invalid={$invalid.name}
		invalidMessage={$invalidMessage.name}
	/>
	<TextField
		bind:ref={emailEl}
		id="user-email"
		label="Email Address"
		name={USER_EMAIL}
		placeholder="e.g. stephenking@lorem.com"
		bind:value={email}
		required
		type="email"
		on:blur={handleBlur}
		on:invalid={handleInvalid}
		on:input={handleInput}
		invalid={$invalid.email}
		invalidMessage={$invalidMessage.email}
	/>
	<TextField
		bind:ref={phoneEl}
		id="user-phone"
		label="Phone Number"
		name={USER_PHONE}
		placeholder="e.g. +1 234 567 890"
		bind:value={phone}
		required
		on:blur={handleBlur}
		on:invalid={handleInvalid}
		on:input={handleInput}
		invalid={$invalid.phone}
		invalidMessage={$invalidMessage.phone}
		pattern="\+\w+"
	/>
</div>
