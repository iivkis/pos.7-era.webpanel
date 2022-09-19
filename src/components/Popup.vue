<template>
    <div class="popup">
        <div class="container">
            <Content>
                <ContentWrap>
                    <ContentWrap class="items-end">
                        <span class="popup__btnClose"></span>
                    </ContentWrap>

                    <ContentWrap>
                        <div class="popup-header">
                            <h1 class="popup-header__title">
                                Список чего-то там
                            </h1>
                        </div>
                    </ContentWrap>
                </ContentWrap>

                <ContentWrap>
                    <slot />
                </ContentWrap>
            </Content>
        </div>
    </div>
</template>

<style lang="postcss">
.popup {
    @apply absolute bg-black bg-opacity-40;
    @apply w-full h-full;
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
import { defineComponent } from "vue";
import Content from "./content/Content.vue";
import ContentWrap from "./content/ContentWrap.vue";

export default defineComponent({
    name: "Popup",
    components: { Content, ContentWrap },
});
</script>
