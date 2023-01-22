<script>
	//@ts-check
	import {
		fieldContents,
		indicatorLabels
	} from '$lib/assets/content';
	import InputButton from '$lib/components/InputButton.svelte';
	import { useTransition } from '$lib/stores/transition';
	import { onDestroy, onMount, tick } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import AddonsField from './AddonsField.svelte';
	import FieldsetShell from './FieldsetShell.svelte';
	import {
		useAddons,
		useAggregation,
		useAnnual,
		usePlan
	} from './form';
	import InfoField from './InfoField.svelte';
	import PlanField from './PlanField.svelte';
	import { useStepper } from './stepper';
	import SummaryCard from './SummaryCard.svelte';
	import throttle from 'lodash-es/throttle';
	import FormCard from './FormCard.svelte';
	import thankLogo from '$lib/assets/icon-thank-you.svg';
	import { blur, fade } from 'svelte/transition';

	const FIELD_NAMES = ['info', 'plan', 'addons', 'summary'];

	const validations = writable({
		info: false,
		plan: true,
		addons: true,
		summary: true
	});

	const stepData = [
		{ order: 1, isValid: () => $validations.info },
		{ order: 2, isValid: () => $validations.plan },
		{ order: 3, isValid: () => $validations.addons },
		{ order: 4, isValid: () => $validations.summary }
	];

	const {
		current: currentStep,
		goToNext,
		goToPrev,
		prev: prevStep,
		next: nextStep,
		goAt,
		last: lastStep
	} = useStepper(stepData);

	const [, startStepTransition] = useTransition(100);

	let actionTimeStamp = 0;
	let fieldsetIsOnScreen = false;

	//form values
	let name = '';
	let email = '';
	let phone = '';
	let submited = false;

	const [isSubmitPending, startSubmitting] = useTransition(3000);

	const yearly = useAnnual();
	const {
		selectedPlanId,
		planList,
		planSummary,
		planSummaryDisplay
	} = usePlan(yearly);
	const {
		selectedAddonIds,
		addonList,
		addonsSummary,
		addonSummaryDisplay
	} = useAddons(yearly);

	const { formattedTotalPrice } = useAggregation(
		planSummary,
		addonsSummary,
		yearly
	);

	const totalCaption = derived(yearly, (v) => {
		const cap = v ? 'Year' : 'Month';

		return `Total (Per ${cap})`;
	});

	const indicators = derived(currentStep, (v) => {
		const items = mergeWithStepOrder(
			indicatorLabels.map((label) => ({ label }))
		);

		return items.map(
			transformActiveValue((item) => item.order === v.order)
		);
	});

	const fields = derived(currentStep, (v) => {
		const items = mergeWithFieldNames(
			mergeWithStepOrder(fieldContents)
		);

		return items.map(
			transformActiveValue((item) => item.order === v.order)
		);
	});

	const [tPushNext, tGoBack] = ((n, p) =>
		/** @type {const}*/ ([throttle(n, 1000), throttle(p, 1000)]))(
		pushNext,
		goToPrev
	);

	//computed reactive
	$: stepLog = logStep(actionTimeStamp);
	$: lastAndRendered = ((l, f) => {
		return l && f;
	})($lastStep, fieldsetIsOnScreen);
	$: ((s) => {
		if (s) {
			window.removeEventListener('popstate', handlePopstate);
			window.removeEventListener('beforeunload', handleBeforeUnload);
			window.addEventListener('popstate', resetOnLast);
		}
	})(submited);

	onMount(() => {
		window.addEventListener('popstate', handlePopstate);
		window.addEventListener('beforeunload', handleBeforeUnload);
	});

	onDestroy(() => {
		window.removeEventListener('popstate', handlePopstate);
		window.removeEventListener('beforeunload', handleBeforeUnload);
		window.removeEventListener('popstate', resetOnLast);
	});

	/******************************
	 *       EVENT HANDLERS       *
	 * ALL EVENT HANDLERS GO HERE *
	 ******************************/

	/**
	 *
	 * @param {MouseEvent} e
	 */
	async function pushNext(e) {
		actionTimeStamp = e.timeStamp;
		await tick();
		startStepTransition(() => {
			if ($currentStep.isValid()) {
				goToNext();

				history.pushState(stepLog, `step-${stepLog.current}`);
			}
		});
	}

	/**
	 *
	 * @param {CustomEvent<{isValid : boolean}>} e
	 */
	function handleAfterValidityCheck(e) {
		$validations.info = e.detail.isValid;
	}

	function handlePopstate() {
		const isConfirmed = confirm('your form will be canceled');

		if (isConfirmed) {
			location.reload();
		}
	}
	/**
	 *
	 * @param {Event} e
	 */
	function handleBeforeUnload(e) {
		e.preventDefault();
		// @ts-ignore
		return (e.returnValue = 'Are you sure you want to exit?');
	}

	function resetOnLast() {
		location.replace('/');
	}

	/**
	 *
	 * @param {number} timestamp
	 */
	function logStep(timestamp) {
		const prev = $prevStep ? $prevStep.order : 0;
		const next = $nextStep ? $nextStep.order : -1;
		const current = $currentStep.order;
		return createStepLog(timestamp, prev, next, current);
	}
	/**
	 *
	 * @param {number}timestamp
	 * @param {number}  prev
	 * @param {number} next
	 * @param {number} current
	 */
	function createStepLog(timestamp, prev, next, current) {
		return { timestamp, prev, next, current };
	}

	/**
	 * @template T
	 * @param {T[]} items
	 */
	function mergeWithStepOrder(items) {
		return items.map((item, index) => ({
			...item,
			order: index + 1
		}));
	}
	/**
	 * @template T
	 * @param {T[]} items
	 */
	function mergeWithFieldNames(items) {
		return items.map((item, index) => ({
			...item,
			fieldName: FIELD_NAMES[index]
		}));
	}
	/**
	 * @template T
	 * @param {(v : T)=>boolean} assertionFn
	 */
	function transformActiveValue(assertionFn) {
		return transform;

		/**
		 * @param {T} target
		 */
		function transform(target) {
			return { ...target, active: assertionFn(target) };
		}
	}
</script>

<div class="flex flex-col dsk:grid dsk:place-items-center">
	<div
		class="flex flex-1 mbl:flex-col mbl:bg-[url(/images/bg-sidebar-mobile.svg)] mbl:bg-[100%_auto] mbl:bg-no-repeat dsk:grid dsk:h-[600px] dsk:w-[max(35em,70%)] dsk:grid-cols-[minmax(4rem,30%)_1fr] dsk:grid-rows-[1fr_auto] dsk:gap-x-4 dsk:rounded-lg dsk:bg-white dsk:p-4 dsk:shadow-xl"
	>
		<!-- Indicators / Sidebar -->
		<div
			class="flex text-white mbl:mx-auto mbl:py-4 dsk:row-[1/-1] dsk:flex-col dsk:gap-4 dsk:overflow-hidden dsk:rounded-xl dsk:bg-[url(/images/bg-sidebar-desktop.svg)] dsk:bg-cover dsk:bg-bottom dsk:px-4 dsk:py-8"
		>
			{#each $indicators as indicator (indicator.order)}
				<div
					class="grid grid-cols-[minmax(32px,20%)_1fr] grid-rows-[repeat(2,auto)] items-center mbl:gap-x-4 dsk:gap-x-[1ch]"
				>
					<div
						class="row-[1/-1] grid  place-items-center mbl:col-[1/-1]"
					>
						<span
							class="grid aspect-square w-8 place-items-center rounded-full border border-white text-center [&.active]:bg-light [&.active]:text-black"
							class:active={indicator.active}>{indicator.order}</span
						>
					</div>
					<div class="text-[0.75rem] uppercase mbl:sr-only">
						Step {indicator.order}
					</div>
					<div class="font-med uppercase mbl:sr-only">
						{indicator.label}
					</div>
				</div>
			{/each}
		</div>
		<!-- End -->
		{#if $isSubmitPending}
			<FormCard class="dsk:mx-12">
				<div class="grid place-items-center">
					<svg
						class="mr-3 h-5 w-5 animate-spin bg-purplish"
						viewBox="0 0 24 24"
					>
						<!-- ... -->
					</svg>
				</div>
			</FormCard>
		{:else if submited}
			<FormCard class="dsk:mx-12">
				{#key submited}
					<div
						class="flex flex-col items-center justify-center gap-4 py-8"
						in:blur={{ amount: 3, duration: 1200 }}
					>
						<img
							class="object-contain mbl:w-12"
							src={thankLogo}
							alt="check icon"
						/>
						<span class="text-center font-bld text-4xl mbl:text-2xl"
							>Thank you!</span
						>
						<p class="text-center text-ntrl-4">
							Thanks for confirming your subscription! We hope you
							have fun using our platform. If you ever need support,
							please feel free to email us at support@loremgaming.com.
						</p>
					</div>
				{/key}
			</FormCard>
		{:else}
			<form
				on:submit|preventDefault={() => {
					startSubmitting(() => {
						submited = true;
					});
				}}
				autocomplete="off"
				class="contents"
			>
				<!-- Fields  -->
				<FormCard class="dsk:mx-12">
					{#each $fields as field (field.order)}
						{#if field.active}
							<FieldsetShell
								active={field.active}
								slotName={field.fieldName}
								title={field.title}
								description={field.desc}
								on:introend={() => (fieldsetIsOnScreen = true)}
								on:introstart={() => (fieldsetIsOnScreen = false)}
							>
								<InfoField
									bind:name
									bind:email
									bind:phone
									slot="info"
									{stepLog}
									on:aftervaliditycheck={handleAfterValidityCheck}
								/>
								<PlanField
									plans={$planList}
									slot="plan"
									bind:yearly={$yearly}
									bind:selectedId={$selectedPlanId}
								/>
								<AddonsField
									bind:selectedIds={$selectedAddonIds}
									addons={$addonList}
									slot="addons"
								/>
								<div class="flex flex-col gap-6" slot="summary">
									<div
										class="flex flex-col gap-2 rounded-md bg-ntrl-2 p-4"
									>
										<SummaryCard
											label={$planSummaryDisplay.name}
											content={$planSummaryDisplay.price}
											changeable={true}
											variant="plan"
											on:click={() => goAt(2)}
										/>
										{#each $addonSummaryDisplay as asd (asd.id)}
											<SummaryCard
												label={asd.name}
												content={asd.price}
												variant="addon"
											/>
										{/each}
									</div>
									<div class="mx-4">
										<SummaryCard
											label={$totalCaption}
											content={$formattedTotalPrice}
											variant="total"
										/>
									</div>
								</div>
							</FieldsetShell>
						{/if}
					{/each}
				</FormCard>
				<!-- End  -->
				<div
					class="mt-auto flex justify-between mbl:bg-white mbl:p-4 dsk:mx-12 dsk:py-8	"
				>
					<InputButton
						label="Go Back"
						variant="borderless"
						on:click={tGoBack}
						visible={$currentStep.order !== 1}
					/>
					<InputButton
						buttonType={lastAndRendered ? 'submit' : 'button'}
						label={lastAndRendered ? 'Confirm' : 'Next Step'}
						variant={lastAndRendered ? 'confirm' : 'primary'}
						on:click={tPushNext}
					/>
				</div>
			</form>
		{/if}
	</div>
</div>
