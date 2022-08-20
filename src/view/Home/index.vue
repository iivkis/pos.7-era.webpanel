<script setup lang="ts">
const router = useRouter();
const store = useStore(key);

if (store.state.EmployeeAPIKey) {
    router.push({
        name: "Metrics",
    });
} else {
    router.push({
        name: "Authorization",
    });
}
</script>

<template></template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { key } from "../../store";

export default defineComponent({
    name: "Home",
});
</script>
