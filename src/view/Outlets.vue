<template>
    <div class="container">
        <Header title="Выберите точку продаж"></Header>

        <ul class="organizations">
            <li class="organizations-item">
                <h2 class="organizations-item__name">Моя организация</h2>
                <ul class="outlets">
                    <li class="outlets-item">
                        <h3 class="outlets-item__name">Главная точка продаж</h3>
                    </li>
                    <li class="outlets-item">
                        <h3 class="outlets-item__name">Старый базар</h3>
                    </li>
                </ul>
            </li>

            <li class="organizations-item">
                <h2 class="organizations-item__name">ИП "Белые ночи"</h2>
                <ul class="outlets">
                    <li class="outlets-item">
                        <h3 class="outlets-item__name">Главная точка продаж</h3>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="postcss">
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
    @apply ml-7 lg:ml-10 mt-1.5 pr-4;
}

.outlets-item {
    @apply flex justify-between;
    @apply relative py-1;
}

.outlets-item::before {
    content: "";

    @apply block absolute rounded-full;
    @apply p-0.5 border-2 border-lime-400;

    top: 11px;
    left: -15px;
}

.outlets-item__name {
    @apply cursor-pointer;
    @apply hover:underline;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/Header.vue";

export default defineComponent({
    name: "Outlets",
    components: { Header },
});
</script>
