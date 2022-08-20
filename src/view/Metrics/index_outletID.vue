<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";

const route = useRoute();
const outletID = Number(route.params.outletID);

var employees = [] as GetEmployeesResponse[];
var sessions = [] as GetSessionsResponse[];

var selectedSessionID = ref(0);
var selectSessions = ref([]) as Ref<
    {
        time: string;
        date: string;
        name: string;
    }[]
>;

var summaryInformation = ref([]) as Ref<{ key: string; value: string }[][]>;

var sessionInfo = ref([]) as Ref<{ key: string; value: string }[][]>;

function renderSummaryInfo() {
    let sumReceipts = 0, // кол-во чеков
        sumCashEarned = 0, // кол-во наличными
        sumBankEarned = 0, //кол-во оплатой по карте
        average = 0; // средний чек

    sessions.forEach((session) => {
        sumReceipts += session.number_of_receipts;
        sumCashEarned += session.cash_earned;
        sumBankEarned += session.bank_earned;
    });

    average = (sumCashEarned + sumBankEarned) / sumReceipts;

    //push info
    summaryInformation.value.push([
        {
            key: "Количество смен",
            value: String(sessions.length),
        },
        {
            key: "Количество чеков",
            value: String(sumReceipts),
        },
    ]);

    summaryInformation.value.push([
        {
            key: "Заработано оплатой наличными",
            value: `${sumCashEarned.toFixed(2)} ₽`,
        },
        {
            key: "Заработано оплатой по карте",
            value: `${sumBankEarned.toFixed(2)} ₽`,
        },
    ]);

    summaryInformation.value.push([
        {
            key: "Средний чек",
            value: `${isNaN(average) ? "0.00" : average.toFixed(2)} ₽`,
        },
        {
            key: "Общая сумма заработка",
            value: `${(sumCashEarned + sumBankEarned).toFixed(2)} ₽`,
        },
    ]);
}

function renderSelectSessions() {
    sessions.forEach((session) => {
        let date = new Date(session.date_open);

        let formatDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
        let formatTime = `${date.getHours()}:${date.getMinutes()}`;

        selectSessions.value.push({
            name: employees.filter((x) => x.id === session.employee_id)[0].name,
            date: formatDate,
            time: formatTime,
        });
    });
}

function renderSessionInfo(sessionIndex: number) {
    sessionInfo.value = [];

    const sess = sessions[sessionIndex];

    const name = employees.filter((x) => x.id === sess.employee_id)[0].name;

    let od = new Date(sess.date_open); //open date
    let cd = new Date(sess.date_close); //close date

    const formatOpenDate = `${od.getHours()}:${od.getMinutes()} - ${od.getDate()}.${od.getMonth()}.${od.getFullYear()}`;
    const formatCloseDate = cd.getTime()
        ? `${cd.getHours()}:${cd.getMinutes()} - ${cd.getDate()}.${cd.getMonth()}.${cd.getFullYear()}`
        : "-";

    sessionInfo.value.push([
        {
            key: "Статус",
            value: sessions[sessionIndex].date_close ? "Закрыта" : "Открыта",
        },
        {
            key: "Сотрудник",
            value: name,
        },
    ]);

    sessionInfo.value.push([
        {
            key: "Открыта",
            value: formatOpenDate,
        },
        {
            key: "Закрыта",
            value: formatCloseDate,
        },
    ]);

    sessionInfo.value.push([
        {
            key: "Наличные (открыта)",
            value: `${sess.cash_open.toFixed(2)} ₽`,
        },
        {
            key: "Наличные (закрыта)",
            value: `${sess.cash_close.toFixed(2)} ₽`,
        },
    ]);

    sessionInfo.value.push([
        {
            key: "Выручка оплатой наличными",
            value: `${sess.cash_earned.toFixed(2)} ₽`,
        },
        {
            key: "Выручка оплатой по карте",
            value: `${sess.bank_earned.toFixed(2)} ₽`,
        },
    ]);

    sessionInfo.value.push([
        {
            key: "Количество чеков",
            value: String(sess.number_of_receipts),
        },
        {
            key: "Выручка",
            value: `${(sess.cash_earned + sess.bank_earned).toFixed(2)} ₽`,
        },
    ]);
}

onMounted(async () => {
    employees = await GetEmployees(outletID);
    sessions = (await GetSessions(outletID)).reverse();

    renderSummaryInfo();
    renderSelectSessions();
    renderSessionInfo(selectedSessionID.value);
});
</script>

<template>
    <div class="container">
        <Header title="Метрики - Смены"></Header>

        <div class="content">
            <div class="content-header">
                <h3 class="content-header__title">Выберите период</h3>
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

            <button class="btn btn--primary mt-2">Показать</button>
        </div>

        <div class="content">
            <div class="content-header">
                <h3 class="content-header__title">
                    Общая информация за выбранный период
                </h3>
                <ul
                    class="content-info"
                    v-for="(summaryInfoGroup, index) in summaryInformation"
                    :key="index"
                >
                    <li
                        class="content-info-item"
                        v-for="(info, index) in summaryInfoGroup"
                        :key="index"
                    >
                        <span class="content-info-item__key">
                            {{ info.key }}:
                        </span>
                        <span class="content-info-item__value">
                            {{ info.value }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="content">
            <div class="content-header">
                <h3 class="content-header__title">Список смен</h3>
            </div>

            <select
                class="select"
                v-model="selectedSessionID"
                @change="renderSessionInfo(selectedSessionID)"
            >
                <option
                    v-for="(sess, index) in selectSessions"
                    :value="index"
                    :key="index"
                >
                    {{ sess.time }} - {{ sess.date }} - {{ sess.name }}
                </option>
            </select>

            <ul
                class="content-info"
                v-for="(sessionGroup, index) in sessionInfo"
                :key="index"
            >
                <li
                    class="content-info-item"
                    v-for="(sess, index) in sessionGroup"
                    :key="index"
                >
                    <span class="content-info-item__key">
                        {{ sess.key }}:
                    </span>
                    <span class="content-info-item__value">
                        {{ sess.value }}
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

.select {
    @apply text-center border bg-slate-100 rounded-md p-2 my-1;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

import Header from "../../components/Header.vue";

import { GetSessions, GetSessionsResponse } from "../../service/api/sessions";
import {
    GetEmployees,
    GetEmployeesResponse,
} from "../../service/api/employees";

export default defineComponent({
    name: "Outlets_OutletID",
    components: { Header },
});
</script>
