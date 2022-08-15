import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Authorization from "../view/Authorization.vue";
import Outlets from "../view/Outlets.vue";
import { UseEmployeeAuth } from "./middleware";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/auth",
        name: "Authorization",
        component: Authorization,
    },

    {
        path: "/outlets",
        name: "Outlets",
        component: Outlets,
        beforeEnter: UseEmployeeAuth,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
