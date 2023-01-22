<script>
	/** @type {import("$lib/assets/content").AddonDataDisplay[]} */
	export let addons;
	/** @type {string[]} */
	export let selectedIds;
</script>

<div class="grid gap-y-4">
	{#each addons as addon, index (addon.id)}
		{@const elId = 'addon-' + (index + 1)}

		<label
			class="group relative isolate grid cursor-pointer grid-flow-row-dense grid-cols-[minmax(1rem,10%)_1fr_20%] grid-rows-[repeat(2,auto)] items-center gap-x-2 p-4"
			for={elId}
		>
			<input
				bind:group={selectedIds}
				class="che peer relative row-span-full inline-block aspect-square w-4 appearance-none before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-white after:absolute after:top-0 after:left-0 checked:before:bg-purplish checked:after:h-full checked:after:w-full checked:after:bg-[url(/images/icon-checkmark.svg)] checked:after:bg-contain checked:after:bg-center checked:after:bg-no-repeat focus-visible:outline-none"
				id={elId}
				type="checkbox"
				name="user-addons"
				value={addon.id}
			/>
			<div
				class="absolute top-0 left-0 z-[-1] h-full w-full rounded-lg mix-blend-multiply outline outline-1 outline-ntrl-3 group-hover:bg-ntrl-2 peer-checked:bg-ntrl-2 peer-focus-visible:outline-purplish"
			/>
			<span class="font-med">{addon.name}</span>
			<span class="col-start-2 row-start-2 text-ntrl-4"
				>{addon.description}</span
			>
			<span class="row-span-full text-purplish">{addon.price}</span>
		</label>
	{/each}
</div>
