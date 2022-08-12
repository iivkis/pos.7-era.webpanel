import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Authorization from '../view/Authorization.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: "/auth",
        name: "Authorization",
        component: Authorization,
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});