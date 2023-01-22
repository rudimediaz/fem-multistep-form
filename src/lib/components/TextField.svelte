<script>
	import { slide } from 'svelte/transition';

	//
	/** @type {string} */
	export let id;
	export let label = '';
	/** @type {string} */
	export let value;
	export let invalid = false;
	/** @type {HTMLInputElement} */
	export let ref;
	export let invalidMessage = '';
</script>

<div
	class="grid grid-cols-[1fr_auto_auto] grid-rows-[repeat(2,auto)] gap-y-1"
>
	<label class="row-[1/2]" for={id}>{label}</label>
	<input
		type="text"
		class="col-[1/-1] row-[2/-1] rounded-md py-2 px-[1em] outline outline-2 outline-ntrl-3 focus-visible:outline-offset-2 focus-visible:outline-purplish [&.invalid]:outline-straw"
		class:invalid
		{id}
		bind:this={ref}
		bind:value
		on:blur
		on:invalid
		on:input
		{...$$restProps}
	/>
	{#if invalid}
		<span
			in:slide={{ duration: 600 }}
			class="col-[-2/-1] row-[1/2] text-straw">{invalidMessage}</span
		>
	{/if}
</div>
