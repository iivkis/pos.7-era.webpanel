<template>
    <div class="container">
        <header class="header">
            <h1 class="header__title">Выберите точку продаж</h1>
        </header>

        <ul class="organizations">
            <li class="organizations-item">
                <h2 class="organizations-item__name">Моя организация</h2>
                <ul class="outlets">
                    <li class="outlets-item">
                        <h3 class="outlets-item__name">Главная точка продаж</h3>
                        <span class="outlets-item__id">#892</span>
                    </li>
                    <li class="outlets-item">
                        <h3 class="outlets-item__name">Старый базар</h3>
                        <span class="outlets-item__id">#892</span>
                    </li>
                </ul>
            </li>

            <li class="organizations-item">
                <h2 class="organizations-item__name">ИП "Белые ночи"</h2>
                <ul class="outlets">
                    <li class="outlets-item">
                        <h3 class="outlets-item__name">Главная точка продаж</h3>
                        <span class="outlets-item__id">#892</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="postcss">
.header {
    @apply w-full text-center;
    @apply bg-white px-2 py-3.5;
    @apply rounded-b-lg shadow-md;
}

.header__title {
    @apply text-lg text-slate-800;
}

.organizations {
    @apply bg-white rounded-lg shadow-md;
    @apply mt-3;
}

.organizations-item {
    @apply flex flex-col;
    @apply relative;
    @apply ml-5 py-3;
}

.organizations-item:not(:first-child) {
    @apply border-t;
}

.organizations-item__name {
    @apply text-xl text-slate-800;
    @apply ml-3.5;
}

.organizations-item__name::before {
    content: "";

    @apply block absolute rounded-full;
    @apply p-1 bg-lime-400;

    top: 22px;
    left: -2px;
}

.outlets {
    @apply flex flex-col;
    @apply ml-7 mt-1.5 pr-4;
}

.outlets-item {
    @apply flex justify-between;
    @apply py-0.5;
}

.outlets-item__name {
    @apply hover:underline;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Outlets",
});
</script>
