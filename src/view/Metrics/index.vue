<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { useRouter } from "vue-router";
import { GetOutlets, GetOutletsResponse } from "../../service/api/outlets";

import {
    GetActivatedInvites,
    GetActivatedInvitesResponse,
} from "../../service/api/invites";

import Header from "../../components/Header.vue";
import Content from "../../components/Content.vue";

const router = useRouter();
var loading = ref(true);

var myOutlets = ref([]) as Ref<GetOutletsResponse[]>;
var affiliates = ref([]) as Ref<GetActivatedInvitesResponse[]>;

onMounted(async () => {
    myOutlets.value = await GetOutlets();
    affiliates.value = await GetActivatedInvites();

    loading.value = false;
});

function redirect(outletID: number) {
    router.push({
        name: "Metrics_OutletID",
        params: {
            outletID: outletID,
        },
    });
}
</script>

<template>
    <div class="container">
        <Header title="Выберите точку продаж"></Header>

        <content
            title="Список доступных точек"
            class="organizations"
            :loading="loading"
        >
            <!-- organization outlets -->
            <li class="organizations-item">
                <h2 class="organizations-item__name">Моя организация</h2>
                <ul class="outlets">
                    <li
                        class="outlets-item"
                        v-for="(outlet, index) in myOutlets"
                        :key="index"
                    >
                        <h3
                            class="outlets-item__name"
                            @click="redirect(outlet.id)"
                        >
                            {{ outlet.name }}
                        </h3>
                    </li>
                </ul>
            </li>
            <!-- /organization outlets -->

            <!-- affiliate outlets-->
            <li
                class="organizations-item"
                v-for="(affiliate, index) in affiliates"
                :key="index"
            >
                <h2 class="organizations-item__name">
                    {{ affiliate.affiliate_org.name }}
                </h2>
                <ul class="outlets">
                    <li
                        class="outlets-item"
                        v-for="(outlet, index) in affiliate.affiliate_org
                            .outlets"
                        :key="index"
                    >
                        <h3
                            class="outlets-item__name"
                            @click="redirect(outlet.id)"
                        >
                            {{ outlet.name }}
                        </h3>
                    </li>
                </ul>
            </li>
            <!-- /affiliate outlets-->
        </content>
    </div>
</template>

<style scoped lang="postcss">
.organizations-item {
    @apply flex flex-col;
    @apply relative;
    @apply ml-5 py-3;
}

.organizations-item:not(:first-of-type) {
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
    @apply ml-8 mt-1.5 pr-4;
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

export default defineComponent({
    name: "Metrics",
});
</script>
