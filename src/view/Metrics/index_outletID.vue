<script setup lang="ts">
import { ref } from "vue";
const route = useRoute();

const outletID = Number(route.params.outletID);

var description = ref([
    [
        {
            key: "Организация",
            value: "Моя организация",
        },
        {
            key: "Точка продаж",
            value: "Главная точка продаж",
        },
    ],
]);

var lastSessionInfo = ref([
    [
        {
            key: "Статус",
            value: "Закрыта",
        },
        {
            key: "Сотрудник",
            value: "Екатерина",
        },
    ],
    [
        {
            key: "Открыта",
            value: "10:15 - 10.07.2022",
        },
        {
            key: "Закрыта",
            value: "20:19 - 10.07.2022",
        },
    ],
    [
        {
            key: "Наличные (открыта)",
            value: "7.000 ₽",
        },
        {
            key: "Наличные (закрыта)",
            value: "25.000 ₽",
        },
    ],
    [
        {
            key: "Кол-во чеков",
            value: "67",
        },
        {
            key: "Выручка",
            value: "18.000 ₽",
        },
    ],
]);
</script>

<template>
    <div class="container">
        <Header title="Метрики"></Header>

        <div class="content">
            <div class="content-header">
                <h3 class="content-header__title">Cмены</h3>
            </div>

            <input
                type="date"
                class="text-center border bg-slate-100 rounded-md p-1 my-1"
                title="от даты открытия смены"
            />

            <input
                type="date"
                class="text-center border bg-slate-100 rounded-md p-1 my-1"
                title="до даты закрытия смены"
            />

            <select class="text-center border bg-slate-100 rounded-md p-2 my-1">
                <option value="">10:15 - 10.07.2022 - Екатерина</option>
                <option value="">10:00 - 9.07.2022 - Дмитрий</option>
                <option value="">10:02 - 8.07.2022 - Екатерина</option>
            </select>

            <ul
                class="content-info"
                v-for="(lastSessionGroup, index) in lastSessionInfo"
                :key="index"
            >
                <li
                    class="content-info-item"
                    v-for="(session, index) in lastSessionGroup"
                    :key="index"
                >
                    <span class="content-info-item__key">
                        {{ session.key }}:
                    </span>
                    <span class="content-info-item__value">
                        {{ session.value }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="postcss">
.content-info {
    @apply flex flex-col;
    @apply py-1.5 px-1;
}

.content-info:not(:first-of-type) {
    @apply border-t;
}

.content-info-item {
    @apply flex py-0.5;
}
.content-info-item__key {
    @apply font-medium mr-1.5;
}
.content-info-item__value {
    @apply text-slate-700;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

import Header from "../../components/Header.vue";

export default defineComponent({
    name: "Outlets_OutletID",
    components: { Header },
});
</script>
