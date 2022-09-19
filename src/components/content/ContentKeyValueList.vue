<template>
    <ul class="content-kvList" v-for="(listGroup, index) in list" :key="index">
        <li
            class="content-kvList-item"
            v-for="(item, index) in listGroup"
            :key="index"
        >
            <span class="content-kvList-item__key"> {{ item.key }}: </span>
            <span class="content-kvLiist-item__value"> {{ item.value }}</span>
        </li>
    </ul>
</template>

<style lang="postcss">
.content-kvList {
    @apply flex flex-col;
    @apply py-1.5 px-1;
}

.content-kvList:not(:first-of-type) {
    @apply border-t;
}
.content-kvList-item {
    @apply flex py-0.5;
}
.content-kvList-item__key {
    @apply font-medium mr-1.5;
}
.content-kvList-item__value {
    @apply text-slate-700;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export interface KeyValue {
    key: string;
    value: string;
}

export default defineComponent({
    name: "ContentKeyValueList",
    props: {
        list: {
            required: true,
            type: Object as PropType<KeyValue[][]>,
        },
    },
});
</script>
