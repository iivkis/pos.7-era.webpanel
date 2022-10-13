<script setup lang="ts">
import Content from "../../components/content/Content.vue";

const props = defineProps({
    start: {
        required: true,
        type: String,
    },
    end: {
        required: true,
        type: String,
    },
});

const emit = defineEmits(["setStart", "setEnd", "show"]);

let start = computed({
    get() {
        return props.start;
    },
    set(val: string) {
        localStorage.setItem("sessions.start", val);
        emit("setStart", val);
    },
});

let end = computed({
    get() {
        return props.end;
    },
    set(val: string) {
        localStorage.setItem("sessions.end", val);
        emit("setEnd", val);
    },
});
</script>

<template>
    <Content title="Выберите период">
        <input
            type="date"
            class="date"
            title="от даты открытия смены"
            v-model="start"
        />

        <input
            type="date"
            class="date"
            title="до даты закрытия смены"
            v-model="end"
        />

        <button class="btn btn--primary mt-2" @click="emit('show')">
            Показать
        </button>
    </Content>
</template>

<style scoped lang="postcss">
.date {
    @apply w-full;
    @apply text-center border bg-slate-100;
    @apply rounded-md p-1 my-1;
}
</style>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
    name: "Metrics_Period",
});
</script>
