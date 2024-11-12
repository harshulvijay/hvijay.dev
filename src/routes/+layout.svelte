<script>
	// global styles
	import "../styles.scss";

	let { children } = $props();
</script>

<main>
	{@render children()}
</main>

<style lang="scss">
	main {
		padding: 5px;
	}
</style>
