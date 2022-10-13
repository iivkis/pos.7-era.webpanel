<script setup lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";

import { GetEmployeeName } from "../../service/helper/employees";

import { GetSessionsResponse } from "../../service/api/sessions";
import { GetEmployeesResponse } from "../../service/api/employees";

import Content from "../../components/content/Content.vue";
import ContentWrap from "../../components/content/ContentWrap.vue";
import ContentKeyValueList, {
    KeyValue,
} from "../../components/content/ContentKeyValueList.vue";

import Popup from "../../components/Popup.vue";
import { GetOrders, GetOrdersResponse } from "../../service/api/orders";

const props = defineProps({
    loading: {
        required: true,
        type: Boolean,
    },

    employees: {
        required: true,
        type: Object as PropType<GetEmployeesResponse[]>,
    },

    sessions: {
        required: true,
        type: Object as PropType<GetSessionsResponse[]>,
    },
});

let selectedID = ref(0);

let options = ref(
    [] as {
        time: string;
        date: string;
        name: string;
    }[]
);

let info = ref([] as KeyValue[][]);

function renderOptions() {
    options.value = [];
    selectedID.value = 0;

    props.sessions.forEach((sess) => {
        let name = GetEmployeeName(props.employees, sess.employee_id);

        let date = new Date(sess.date_open);

        let formatedDate = `${date.getDate()}.${
            date.getMonth() + 1
        }.${date.getFullYear()}`;

        let formatedTime = `${date.getHours()}:${date.getMinutes()}`;

        options.value.push({
            time: formatedTime,
            date: formatedDate,
            name: name || "(сотрудник удален)",
        });
    });
}

function renderInfo() {
    info.value = [];
    if (props.sessions.length == 0) {
        return;
    }

    const sess = props.sessions[selectedID.value];

    let d1 = new Date(sess.date_open);
    let d2 = new Date(sess.date_close);

    let openDate = `${d1.getHours()}:${d1.getMinutes()} - ${d1.getDate()}.${
        d1.getMonth() + 1
    }.${d1.getFullYear()}`;

    let closedDate = `${d2.getHours()}:${d2.getMinutes()} - ${d2.getDate()}.${
        d2.getMonth() + 1
    }.${d2.getFullYear()}`;

    if (!d2.getTime()) closedDate = "-";

    const name = GetEmployeeName(props.employees, sess.employee_id);

    info.value.push([
        {
            key: "Статус",
            value: sess.date_close ? "Закрыта" : "Открыта",
        },
        {
            key: "Сотрудник",
            value: name || "(сотрудник удален)",
        },
    ]);

    info.value.push([
        {
            key: "Открыта",
            value: openDate,
        },
        {
            key: "Закрыта",
            value: closedDate,
        },
    ]);

    info.value.push([
        {
            key: "Наличные (открыта)",
            value: `${sess.cash_open.toFixed(2)} ₽`,
        },
        {
            key: "Наличные (закрыта)",
            value: sess.date_close ? `${sess.cash_close.toFixed(2)} ₽` : "-",
        },
    ]);

    info.value.push([
        {
            key: "Выручка оплатой наличными",
            value: `${sess.cash_earned.toFixed(2)} ₽`,
        },
        {
            key: "Выручка оплатой по карте",
            value: `${sess.bank_earned.toFixed(2)} ₽`,
        },
    ]);

    info.value.push([
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

function render() {
    renderOptions();
    renderInfo();
}

watch(() => props.sessions, render);
watch(() => props.employees, render);
watch(selectedID, renderInfo);

var popupReceiptsShow = ref(false);
var popupReceiptsOrders = ref([] as GetOrdersResponse[]);
var popupReceiptsTotal = ref({ sum: 0 });

async function showReceipts() {
    const sessionID = props.sessions[selectedID.value].id;
    popupReceiptsOrders.value = await GetOrders(sessionID);

    popupReceiptsOrders.value.forEach((receipt) => {
        receipt.list.forEach((product) => {
            popupReceiptsTotal.value.sum +=
                product.product_price * product.count;
        });
    });

    popupReceiptsShow.value = true;
}

function closeReceipts() {
    popupReceiptsOrders.value = [];
    popupReceiptsTotal.value.sum = 0;
    popupReceiptsShow.value = false;
}

function formatDate(date: number): string {
    let d = new Date(date);
    return `${d.getHours()}:${d.getMinutes()}`;
}
</script>

<template>
    <Popup title="Чеки" :toggle="popupReceiptsShow" @close="closeReceipts">
        <hr class="mt-5" />

        <ContentWrap>
            <ul class="orders">
                <li
                    class="orders-item"
                    v-for="(receipt, indexR) in popupReceiptsOrders"
                    :key="indexR"
                >
                    <span class="orders-item__receiptID">
                        #{{ indexR + 1 }} ({{ formatDate(receipt.info.date) }})
                    </span>
                    <ul
                        class="orders-item-list"
                        v-for="(product, indexP) in receipt.list"
                        :key="indexP"
                    >
                        <li class="orders-item-list-product">
                            <p class="orders-item-list-product__name">
                                {{ product.product_name }}
                            </p>
                            <p class="orders-item-list-product__count">
                                {{ product.count }}
                            </p>
                            <p class="orders-item-list-product__revenue">
                                {{
                                    (
                                        product.count * product.product_price
                                    ).toFixed(2)
                                }}
                                ₽
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>

            <hr class="my-5" />

            <div class="text-right">
                <span>Сумма: {{ popupReceiptsTotal.sum.toFixed(2) }} ₽</span>
            </div>
        </ContentWrap>
    </Popup>

    <content title="Список смен" :loading="loading">
        <content-wrap v-if="sessions.length > 0">
            <select class="select" v-model="selectedID">
                <option
                    v-for="(opt, index) in options"
                    :value="index"
                    :key="index"
                >
                    {{ opt.time }} - {{ opt.date }} - {{ opt.name }}
                </option>
            </select>

            <content-key-value-list :list="info"></content-key-value-list>
            <button class="btn btn--link" @click="showReceipts">
                показать чеки за смену
            </button>
        </content-wrap>

        <content-wrap v-else>
            <p class="text-center text-slate-600 p-2">
                Здесь будет отображен список смен, как только они появятся
            </p>
        </content-wrap>
    </content>
</template>

<style scoped lang="postcss">
.select {
    @apply text-center border bg-slate-100 rounded-md p-2 my-1;
}

.orders {
    @apply flex flex-col px-2;
    @apply overflow-y-auto;
    max-height: 720px;
}

.orders::-webkit-scrollbar {
    width: 4px; /* ширина scrollbar */
}
.orders::-webkit-scrollbar-track {
    background: transparent; /* цвет дорожки */
}
.orders::-webkit-scrollbar-thumb {
    background-color: #bbb; /* цвет плашки */
    border-radius: 20px; /* закругления плашки */
}

.orders-item {
    @apply flex flex-col;
    @apply mt-2 pt-2;
    @apply font-bold;
    @apply border-dashed border-slate-700;

    font-family: "Courier New", Courier, monospace;
}

.orders-item:not(:first-of-type) {
    @apply border-t;
}

.orders-item__receiptID {
    @apply text-center;
}

.orders-item-list {
    @apply flex flex-col;
}

.orders-item-list-product {
    @apply flex flex-row;
}

.orders-item-list-product__name {
    @apply w-6/12 md:w-8/12;
}

.orders-item-list-product__count {
    @apply w-2/12;
    @apply text-end;
}

.orders-item-list-product__revenue {
    @apply w-4/12 md:w-2/12;
    @apply text-end;
}
</style>

<script lang="ts">
export default defineComponent({
    name: "Metrics_Session_Info",
});
</script>
