<script>
	import { slide, blur } from 'svelte/transition';

	/** @type {import("$lib/assets/content").PlanDataDisplay[]} */
	export let plans;
	/** @type boolean */
	export let yearly;
	/** @type string*/
	export let selectedId;
</script>

<div
	class="flex grid-flow-row-dense flex-col mbl:gap-4 dsk:grid dsk:auto-rows-min dsk:grid-cols-[repeat(3,minmax(80px,1fr))] dsk:gap-x-4 dsk:gap-y-4"
>
	{#each plans as plan, index (plan.id)}
		{@const elId = `plan-${index}`}
		<input
			class="sr-only icl:bg-ntrl-1 icl:outline-purplish"
			bind:group={selectedId}
			type="radio"
			id={elId}
			value={plan.id}
		/>
		<label
			class="grid cursor-pointer grid-cols-[minmax(2rem,20%)_1fr] rounded-lg p-4 outline outline-1 outline-ntrl-3 hover:bg-ntrl-1 hover:outline-purplish mbl:items-center mbl:gap-x-[1ch] dsk:flex dsk:flex-col"
			for={elId}
		>
			<span
				class="row-[1/4] grid place-items-center dsk:block dsk:flex-auto dsk:basis-16"
			>
				<img
					src={plan.logoURL}
					alt="gamepad"
					class="dsk:w-8 dsk:object-contain"
				/>
			</span>
			<span class="font-med">{plan.name}</span>
			{#key yearly}
				<span
					class="col-[2/-1] text-sm text-ntrl-4"
					in:blur={{ duration: 700, amount: 2 }}>{plan.price}</span
				>
			{/key}
			{#if yearly}
				<span transition:slide>2 months free</span>
			{/if}
		</label>
	{/each}
	<div
		class="col-[1/-1] flex items-center justify-center gap-[1ch] rounded-lg bg-ntrl-2 p-4"
	>
		<span>Monthly</span>
		<input
			class="peer sr-only"
			type="checkbox"
			id="yearly"
			bind:checked={yearly}
		/>
		<label
			class="after:circle-shrink relative inline-block h-4 w-8 cursor-pointer outline-marine before:absolute before:top-0 before:left-0 before:h-full  before:w-full before:rounded-lg before:bg-marine after:absolute after:top-0 after:left-0 after:aspect-square after:w-1/2 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2"
			for="yearly"
		>
			<span class="sr-only">yearly</span>
		</label>
		<span>Yearly</span>
	</div>
</div>
