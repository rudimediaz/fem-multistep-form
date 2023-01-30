<script>
	import '../app.css';
	export const ssr = false;
	export const prerender = false;
</script>

<svelte:head>
	<meta
		name="description"
		content="Frontend Mentor Challenge Solution"
	/>
	<meta
		name="keywords"
		content="frontend mentor, solution, challenge"
	/>

	<title>Frontend Mentor | Multi-step form</title>
</svelte:head>

<div
	class="grid grid-rows-[minmax(100vh,1fr)_auto] bg-light/40 font-reg"
>
	<main class="contents">
		<slot />
	</main>
	<footer class="pt-20 mbl:sr-only">
		<div class="text-center text-[11px]">
			Challenge by <a
				class="text-[hsl(228_45%_44%)]"
				href="https://www.frontendmentor.io?ref=challenge"
				target="_blank"
				rel="noreferrer">Frontend Mentor</a
			>. Coded by <a href="#!">Rudhi Mediastara</a>.
		</div>
	</footer>
</div>
