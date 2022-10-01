<script setup lang="ts">
import Content from "../components/content/Content.vue";
import ContentWrap from "../components/content/ContentWrap.vue";

const props = defineProps({
    title: {
        required: true,
        type: String,
    },
    toggle: {
        required: true,
        type: Boolean,
    },
});

const emit = defineEmits(["close"]);

watch(
    () => props.toggle,
    () => {
        if (props.toggle) document.body.style.overflowY = "hidden";
        else document.body.style.overflowY = "inherit";
    }
);
</script>

<template>
    <div class="popup" v-if="toggle">
        <div class="container">
            <Content>
                <ContentWrap>
                    <ContentWrap class="items-end">
                        <span
                            class="popup__btnClose"
                            @click="emit('close')"
                        ></span>
                    </ContentWrap>

                    <ContentWrap>
                        <div class="popup-header">
                            <h1 class="popup-header__title">
                                {{ title }}
                            </h1>
                        </div>
                    </ContentWrap>
                </ContentWrap>
                <slot />
            </Content>
        </div>
    </div>
</template>

<style lang="postcss">
.popup {
    @apply w-full h-screen;
    @apply fixed bg-black bg-opacity-40;
    @apply top-0 left-0 lg:py-5;
    @apply overflow-y-auto;
}

.popup::-webkit-scrollbar {
    width: 0;
}

.popup::-webkit-scrollbar-track {
    background: transparent;
}

.popup::-webkit-scrollbar-thumb {
    background-color: transparent;
}

.popup__btnClose {
    width: 20px;
    height: 15px;
    @apply relative cursor-pointer;
}

.popup__btnClose::after,
.popup__btnClose::before {
    content: "";
    display: block;
    width: 3px;
    height: 20px;
    @apply bg-slate-300;
    @apply absolute rounded-full;
}

.popup__btnClose::after {
    transform: rotate(45deg);
}

.popup__btnClose::before {
    transform: rotate(-45deg);
}

.popup-header {
    @apply w-full;
    @apply text-center;
}

.popup-header__title {
    @apply text-xl;
}
</style>

<script lang="ts">
import { defineComponent, watch } from "vue";

export default defineComponent({
    name: "Popup",
});
</script>
