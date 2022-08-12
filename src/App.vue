<template>
	<RouterView></RouterView>
</template>

<style lang="postcss">
body {
	@apply bg-slate-100;
}

.container {
	@apply mx-auto;
}

.btn {
	@apply transition-all;
	@apply px-6 py-3 rounded-sm;
	@apply text-white tracking-wide;
}

.btn--primary {
	@apply bg-lime-500;
}

.btn--primary--outline {
	@apply text-lime-500 hover:text-white;
	@apply border border-lime-500;
	@apply hover:bg-lime-500;
}
</style>
