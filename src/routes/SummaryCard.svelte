<script>
	/** @type {string} */
	export let label;
	/** @type {string} */
	export let content;
	export let changeable = false;
	/** @type {'plan' | 'addon' | 'total'} */
	export let variant = 'addon';

	$: addon = variant === 'addon';
	$: plan = variant === 'plan';
	$: total = variant === 'total';
</script>

<div
	class="grid grid-cols-[1fr_auto] [&.plan]:border-b [&.plan]:border-b-pastel [&.plan]:py-2 [&.plan]:font-med"
	class:changeable
	class:addon
	class:plan
	class:total
>
	<span
		class="[&:is(.addon,.total)]:text-ntrl-4"
		class:addon
		class:plan
		class:total>{label}</span
	>
	<span
		class="[&.total]:font-med [&.total]:text-purplish "
		class:total
		class:plan
		class:addon>{content}</span
	>
	{#if changeable}
		<a
			class="font-reg text-ntrl-4 underline hover:text-purplish focus-visible:font-med focus-visible:text-purplish focus-visible:outline-none"
			href="#!"
			on:click|preventDefault>Change</a
		>
	{/if}
</div>
