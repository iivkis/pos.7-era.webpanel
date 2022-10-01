<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { GetSessions, GetSessionsResponse } from "../../service/api/sessions";

import {
    GetEmployees,
    GetEmployeesResponse,
} from "../../service/api/employees";

import Header from "../../components/Header.vue";

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

async function render() {
    loading.value = true;
    sessions.value = await loadSessions();
    setTimeout(() => (loading.value = false), 1000);
}

onMounted(async () => {
    employees.value = await GetEmployees(outletID);
    await render();
});
</script>

<template>
    <div class="container">
        <Header title="Метрики - Смены"></Header>

        <MetricsPeriod
            :start="startPeriodDate"
            :end="endPeriodDate"
            @set-start="(val: string)=> {startPeriodDate = val}"
            @set-end="(val: string)=> {endPeriodDate = val}"
            @show="render"
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

<style scoped lang="postcss"></style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Outlets_OutletID",
});
</script>
