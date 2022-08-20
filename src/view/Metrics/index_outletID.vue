<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { useRoute } from "vue-router";

import Header from "../../components/Header.vue";
import Content from "../../components/Content.vue";
import ContentWrap from "../../components/ContentWrap.vue";
import ContentKeyValueList from "../../components/ContentKeyValueList.vue";
import { KeyValue } from "../../components/ContentKeyValueList.vue";

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

var summaryInformation = ref([]) as Ref<KeyValue[][]>;
var sessionInfo = ref([]) as Ref<KeyValue[][]>;

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

        <content title="Выберите период">
            <input
                type="date"
                class="dateInput"
                title="от даты открытия смены"
            />

            <input
                type="date"
                class="dateInput"
                title="до даты закрытия смены"
            />

            <button class="btn btn--primary mt-2">Показать</button>
        </content>

        <content title="Общая информация за выбранный период">
            <content-key-value-list
                :list="summaryInformation"
            ></content-key-value-list>
        </content>

        <content title="Список смен">
            <content-wrap v-if="selectSessions.length > 0">
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
                        {{ sess.time }} - {{ sess.date }} -
                        {{ sess.name }}
                    </option>
                </select>

                <content-key-value-list
                    :list="sessionInfo"
                ></content-key-value-list>
            </content-wrap>

            <content-wrap v-else>
                <p class="text-center text-slate-600 p-2">
                    Здесь будет отображен список смен, как только они появятся,
                    но пока что тут пусто
                </p>
            </content-wrap>
        </content>
    </div>
</template>
<style scoped lang="postcss">
.dateInput {
    @apply text-center border bg-slate-100;
    @apply rounded-md p-1 my-1;
}
.select {
    @apply text-center border bg-slate-100 rounded-md p-2 my-1;
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
