<template>
    <div class="content">
        <div class="content-header" v-if="title">
            <h3 class="content-header__title">{{ title }}</h3>
        </div>

        <slot />
    </div>
</template>

<style lang="postcss">
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
    @apply border-b border-gray-400;
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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Content",
    props: {
        title: {
            type: String,
            required: false,
        },
    },
});
</script>
