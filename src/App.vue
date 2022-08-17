<template>
    <RouterView></RouterView>
</template>

<style lang="postcss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

body {
    @apply bg-slate-100;
    font-family: "Roboto", sans-serif;
}

.container {
    @apply mx-auto;
    @apply lg:w-1/3;
}

.btn {
    @apply transition-all;
    @apply px-6 py-3 rounded-md;
    @apply text-white tracking-wide;
}

.btn--primary {
    @apply bg-lime-500;
}

.btn--primary--outline {
    @apply text-lime-500 hover:text-white;
    @apply border border-lime-500 hover:bg-lime-500;
}

.content {
    @apply bg-white md:rounded-lg shadow-md;
    @apply flex flex-col;
    @apply p-3 md:mt-3;
}

.content:first-of-type {
    @apply rounded-t-lg;
    @apply mt-3;
}

.content:not(:last-of-type) {
    @apply border-b border-slate-400;
    @apply md:border-none;
}

.content:last-of-type {
    @apply rounded-b-lg;
}

.content-header {
    @apply text-center;
}

.content-header__title {
    @apply text-sm;
}
</style>
