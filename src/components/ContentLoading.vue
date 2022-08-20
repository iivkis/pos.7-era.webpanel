<template>
    <div class="content-loading">
        <div class="content-loading-figure">
            <div
                class="content-loading-figure__bar content-loading-figure__bar--1"
            ></div>
            <div
                class="content-loading-figure__bar content-loading-figure__bar--2"
            ></div>
            <div
                class="content-loading-figure__bar content-loading-figure__bar--3"
            ></div>
            <div
                class="content-loading-figure__bar content-loading-figure__bar--4"
            ></div>
            <div
                class="content-loading-figure__bar content-loading-figure__bar--5"
            ></div>
            <div
                class="content-loading-figure__bar content-loading-figure__bar--6"
            ></div>
            <div
                class="content-loading-figure__bar content-loading-figure__bar--7"
            ></div>
            <div
                class="content-loading-figure__bar content-loading-figure__bar--8"
            ></div>
        </div>
    </div>
</template>

<style lang="postcss">
.content-loading {
    @apply flex justify-center;
    @apply my-7;
}

.content-loading-figure {
    @apply flex;
}

.content-loading-figure__bar {
    width: 5px;
    height: 40px;
    margin: 0 1px;
    animation: content-loading 1.2s linear infinite;
}

.content-loading-figure__bar--1 {
    animation-delay: 0.4s;
}

.content-loading-figure__bar--2 {
    animation-delay: 0.3s;
}

.content-loading-figure__bar--3 {
    animation-delay: 0.2s;
}

.content-loading-figure__bar--4 {
    animation-delay: 0.1s;
}

.content-loading-figure__bar--5 {
    animation-delay: 0.1s;
}

.content-loading-figure__bar--6 {
    animation-delay: 0.2s;
}

.content-loading-figure__bar--7 {
    animation-delay: 0.3s;
}

.content-loading-figure__bar--8 {
    animation-delay: 0.4s;
}

@keyframes content-loading {
    0% {
        transform: scaleY(0.1);
        @apply bg-lime-500;
        @apply rounded-none;
    }
    50% {
        transform: scaleY(1);
        @apply bg-green-500;
        @apply rounded-full;
    }
    100% {
        transform: scaleY(0.1);
        @apply bg-lime-500;
        @apply rounded-none;
    }
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ContentLoading",
});
</script>
