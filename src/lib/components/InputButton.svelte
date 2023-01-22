<script>
	/** @type {'button' | 'submit'} */
	export let buttonType = 'button';
	export let label = '';

	/** @type {'primary' | 'borderless' | 'confirm'} */
	export let variant = 'primary';
	export let visible = true;

	$: prm = variant === 'primary';
	$: bdl = variant === 'borderless';
	$: cfm = variant === 'confirm';
</script>

<input
	class={`${$$props.class} invisible  cursor-pointer rounded-md py-2 px-[1em] outline focus-visible:outline-offset-2 [&.bdl]:bg-transparent [&.bdl]:text-black/70 [&.bdl]:outline-transparent [&.bdl]:hover:text-black [&.bdl]:focus-visible:outline-black [&.prm]:bg-marine [&.prm]:outline-marine [&.prm]:hover:bg-marine/70 [&.prm]:hover:outline-marine/70 [&.visible]:visible [&.cfm]:bg-purplish [&.cfm]:hover:bg-purplish/70 [&:not(.bdl)]:text-white`}
	class:prm
	class:bdl
	class:cfm
	class:visible
	type={buttonType}
	value={label}
	on:click
/>
