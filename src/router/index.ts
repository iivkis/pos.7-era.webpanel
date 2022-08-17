import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import AuthorizationIndex from "../view/Authorization/index.vue";
import MetricsIndex from "../view/Metrics/index.vue";
import MetricsOutletID from "../view/Metrics/index_outletID.vue";

import { UseEmployeeAuth } from "./middleware";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/auth",
        name: "Authorization",
        component: AuthorizationIndex,
    },

    {
        path: "/metrics",
        name: "Metrics",
        component: MetricsIndex,
        beforeEnter: UseEmployeeAuth,
    },

    {
        path: "/metrics/:outletID",
        name: "Metrics_OutletID",
        component: MetricsOutletID,
        // beforeEnter: UseEmployeeAuth,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
