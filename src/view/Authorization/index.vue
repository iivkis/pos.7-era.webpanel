<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { key, MutationTypes } from "../../store/";
import { useRouter } from "vue-router";

import Header from "../../components/Header.vue";
import Content from "../../components/Content.vue";

const router = useRouter();
const store = useStore(key);

var login = ref("");
var password = ref("");
var pin = ref("");

async function authorization() {
    try {
        const { token } = await SignInOrganization(login.value, password.value);
        store.commit(MutationTypes.SET_ORGANIZATION_API_KEY, token);
        console.info("organization:", store.state.OrganizationAPIKey);
    } catch (err: ServerError) {
        switch (err.code) {
            case Errors.ERROR_INVALID_PASSWORD:
                alert("неверный пароль организации");
        }
        return;
    }

    var ownerID: number = 0;
    try {
        const { id } = (await GetEmployees(0))[0];
        ownerID = id;
    } catch (err: ServerError) {
        console.error(err);
        return;
    }

    try {
        const { token } = await SignInEmployee(ownerID, pin.value);
        store.commit(MutationTypes.SET_EMPLOYEE_API_KEY, token);
        console.info("employee:", store.state.EmployeeAPIKey);
    } catch (err: ServerError) {
        alert("Упс, неверный пинкод владельца");
        console.error(err);
        return;
    }

    console.info("success login");

    router.push({
        name: "Metrics",
    });
}
</script>

<template>
    <div class="container">
        <Header title="Авторизация в POS-системе"></Header>

        <content title="Введите данные для входа">
            <form class="form">
                <div class="form-row">
                    <div class="form-row-field">
                        <input
                            name="email"
                            type="text"
                            class="form-row-field__input"
                            placeholder="Логин организации"
                            v-model="login"
                        />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-row-field">
                        <input
                            name="password"
                            type="password"
                            class="form-row-field__input"
                            placeholder="Пароль организации"
                            v-model="password"
                        />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-row-field">
                        <input
                            name="pin"
                            type="text"
                            class="form-row-field__input"
                            placeholder="Пин-код владельца"
                            autocomplete="off"
                            v-model="pin"
                        />
                    </div>
                </div>

                <div class="form-row">
                    <button
                        class="btn btn--primary--outline w-full"
                        @click.prevent="authorization"
                    >
                        Войти
                    </button>
                </div>
            </form>
        </content>
    </div>
</template>

<style lang="postcss">
.form-row {
    @apply my-2 flex justify-center;
}

.form-row-field {
    @apply w-full;
}

.form-row-field__input {
    @apply w-full bg-slate-100;
    @apply p-3.5 rounded-md;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

import { ServerError } from "../../service/api/api.types";

import { GetEmployees } from "../../service/api/employees";
import { Errors } from "../../service/api/errors";

import {
    SignInOrganization,
    SignInEmployee,
} from "../../service/api/authorization";

export default defineComponent({
    name: "Authorization",
});
</script>
