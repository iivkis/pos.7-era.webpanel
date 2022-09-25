<script setup lang="ts">
import { defineComponent, PropType, ref, Ref, watch } from "vue";

import Content from "../../components/content/Content.vue";

import ContentKeyValueList, {
    KeyValue,
} from "../../components/content/ContentKeyValueList.vue";
import { GetSessionsResponse } from "../../service/api/sessions";

const props = defineProps({
    loading: {
        required: true,
        type: Boolean,
    },

    sessions: {
        required: true,
        type: Object as PropType<GetSessionsResponse[]>,
    },
});

var information = ref([]) as Ref<KeyValue[][]>;

function render() {
    information.value = [];

    let sumReceipts = 0; // кол-во чеков
    let sumCashEarned = 0; // кол-во наличными
    let sumBankEarned = 0; //кол-во оплатой по карте

    props.sessions.forEach((session) => {
        sumReceipts += session.number_of_receipts;
        sumCashEarned += session.cash_earned;
        sumBankEarned += session.bank_earned;
    });

    let average = (sumCashEarned + sumBankEarned) / sumReceipts;
    if (isNaN(average)) {
        average = 0;
    }

    information.value.push([
        {
            key: "Количество смен",
            value: String(props.sessions.length),
        },
        {
            key: "Количество чеков",
            value: String(sumReceipts),
        },
    ]);

    information.value.push([
        {
            key: "Заработано оплатой наличными",
            value: `${sumCashEarned.toFixed(2)} ₽`,
        },
        {
            key: "Заработано оплатой по карте",
            value: `${sumBankEarned.toFixed(2)} ₽`,
        },
    ]);

    information.value.push([
        {
            key: "Средний чек",
            value: `${average.toFixed(2)} ₽`,
        },
        {
            key: "Общая сумма заработка",
            value: `${(sumCashEarned + sumBankEarned).toFixed(2)} ₽`,
        },
    ]);
}

watch(() => props.sessions, render);
</script>

<template>
    <Content title="Общая информация за выбранный период" :loading="loading">
        <content-key-value-list :list="information"></content-key-value-list>
    </Content>
</template>

<script lang="ts">
export default defineComponent({
    name: "Metrics_Summary_Info",
});
</script>
