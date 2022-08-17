<template>
    <header class="header">
        <h1 class="header__title">{{title}}</h1>
    </header>
</template>

<style scoped lang="postcss">
.header {
    @apply w-full text-center;
    @apply bg-white px-2 py-3;
    @apply rounded-b-lg shadow-md;
    @apply border-b-2 border-lime-400;
}

.header__title {
    @apply text-lg text-slate-800;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Header",
    props: {
        title: {
            required: true,
            type: String,
        },
    },
});
</script>
