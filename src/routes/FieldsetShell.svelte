<script>
	import { fade } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';
	import { onMount } from 'svelte';
	/** @type {string}*/
	export let slotName;
	export let active = false;
	export let title = 'title';
	export let description = 'description';
	let focusPoint;
	onMount(() => {
		document.activeElement.blur();
		focusPoint?.focus();
	});
</script>

{#key active}
	<div
		class="flex flex-col gap-4"
		in:fade={{ duration: 700, easing: cubicIn }}
		on:introstart
		on:introend
	>
		<fieldset class="contents">
			<legend class="p-0 font-bld text-2xl">{title}</legend>
			<p class="text-ntrl-4">{description}</p>
			<input
				bind:this={focusPoint}
				class="sr-only"
				type="button"
				id="focus-point"
			/>
			<label class="sr-only" for="focus-point"
				>focus point press tab to continue</label
			>
			{#if slotName === 'info'}
				<slot name="info" />
			{:else if slotName === 'plan'}
				<slot name="plan" />
			{:else if slotName === 'addons'}
				<slot name="addons" />
			{:else if slotName === 'summary'}
				<slot name="summary" />
			{/if}
		</fieldset>
	</div>
{/key}
