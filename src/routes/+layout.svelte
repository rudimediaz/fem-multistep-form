<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Frontend Mentor | Multi-step form</title>
</svelte:head>

<div
	class="grid grid-rows-[minmax(100vh,1fr)_auto] bg-light/40 font-reg"
>
	<main class="contents">
		<slot />
	</main>
	<footer>
		<div class="text-center text-[11px]">
			Challenge by <a
				class="text-[hsl(228_45%_44%)]"
				href="https://www.frontendmentor.io?ref=challenge"
				target="_blank"
				rel="noreferrer">Frontend Mentor</a
			>. Coded by <a href="#!">Your Name Here</a>.
		</div>
	</footer>
</div>
