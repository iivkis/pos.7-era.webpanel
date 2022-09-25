<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { useRoute } from "vue-router";

import Header from "../../components/Header.vue";

import Popup from "../../components/Popup.vue";

import MetricsPeriod from "../../components/metrics/Period.vue";
import MetricsSummaryInfo from "../../components/metrics/SummaryInfo.vue";
import MetricsSessionInfo from "../../components/metrics/SessionInfo.vue";

const route = useRoute();

const outletID = Number(route.params.outletID);

let loading = ref(true);

let employees = ref([] as GetEmployeesResponse[]);
let sessions = ref([] as GetSessionsResponse[]);

let startPeriodDate = ref(localStorage.getItem("sessions.start") || "");
let endPeriodDate = ref(localStorage.getItem("sessions.end") || "");

async function loadSessions(): Promise<GetSessionsResponse[]> {
    let start = new Date(startPeriodDate.value).getTime();
    let end = new Date(endPeriodDate.value).getTime();
    return (await GetSessions(outletID, start, end)).reverse();
}

async function showAll() {
    loading.value = true;

    sessions.value = await loadSessions();

    setTimeout(() => {
        loading.value = false;
    }, 1000);
}

onMounted(async () => {
    employees.value = await GetEmployees(outletID);
    await showAll();
});
</script>

<template>
    <!-- <Popup :show="false">
        <ContentWrap>
            <ul class="orders">
                <li class="orders__item">
                    <span class="orders-item__receiptID">#1</span>
                    <ul class="orders-item__list">
                        <li class="orders-item-list__product">
                            <p class="orders-item-list-product__name">Огурец</p>
                            <p class="orders-item-list-product__count">0,83</p>
                            <p class="orders-item-list-product__revenue">
                                893 ₽
                            </p>
                        </li>
                        <li class="orders-item-list__product">
                            <p class="orders-item-list-product__name">Огурец</p>
                            <p class="orders-item-list-product__count">0,83</p>
                            <p class="orders-item-list-product__revenue">
                                893 ₽
                            </p>
                        </li>
                    </ul>
                </li>
                <li class="orders__item">
                    <span class="orders-item__receiptID">#1</span>
                    <ul class="orders-item__list">
                        <li class="orders-item-list__product">
                            <p class="orders-item-list-product__name">Огурец</p>
                            <p class="orders-item-list-product__count">0,83</p>
                            <p class="orders-item-list-product__revenue">
                                893 ₽
                            </p>
                        </li>
                    </ul>
                </li>
                <li class="orders__item">
                    <span class="orders-item__receiptID">#1</span>
                    <ul class="orders-item__list">
                        <li class="orders-item-list__product">
                            <p class="orders-item-list-product__name">Огурец</p>
                            <p class="orders-item-list-product__count">0,83</p>
                            <p class="orders-item-list-product__revenue">
                                893 ₽
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>
        </ContentWrap>
    </Popup> -->

    <div class="container">
        <Header title="Метрики - Смены"></Header>

        <MetricsPeriod
            :start="startPeriodDate"
            :end="endPeriodDate"
            @set-start="(val: string)=> {startPeriodDate = val}"
            @set-end="(val: string)=> {endPeriodDate = val}"
            @show="showAll"
        ></MetricsPeriod>

        <MetricsSummaryInfo :sessions="sessions" :loading="loading">
        </MetricsSummaryInfo>

        <MetricsSessionInfo
            :loading="loading"
            :employees="employees"
            :sessions="sessions"
        >
        </MetricsSessionInfo>
    </div>
</template>
<style scoped lang="postcss">
.orders {
    @apply flex flex-col;
}

.orders__item {
    font-family: "Courier New", Courier, monospace;

    @apply font-bold;
    @apply mt-2 pt-2;
    @apply flex flex-col;
    @apply border-dashed border-slate-700;
}

.orders__item:not(:first-of-type) {
    @apply border-t;
}

.orders-item__receiptID {
    @apply text-center;
}

.orders-item__list {
    @apply flex flex-col;
}

.orders-item-list__product {
    @apply flex flex-row;
}

.orders-item-list-product__name {
    @apply w-8/12;
}

.orders-item-list-product__count {
    @apply w-2/12;
    @apply text-end;
}

.orders-item-list-product__revenue {
    @apply w-2/12;
    @apply text-end;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

import { GetSessions, GetSessionsResponse } from "../../service/api/sessions";

import {
    GetEmployees,
    GetEmployeesResponse,
} from "../../service/api/employees";

export default defineComponent({
    name: "Outlets_OutletID",
});
</script>
