import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

export enum MutationTypes {
	SET_ORGANIZATION_API_KEY = "SET_ORGANIZATION_API_KEY",
	SET_EMPLOYEE_API_KEY = "SET_EMPLOYEE_API_KEY",
}

export interface State {
	OrganizationAPIKey: string;
	EmployeeAPIKey: string;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
	state: {
		OrganizationAPIKey: "",
		EmployeeAPIKey: "",
	},

	mutations: {
		[MutationTypes.SET_ORGANIZATION_API_KEY](state, key: string) {
			state.OrganizationAPIKey = key;
		},
		[MutationTypes.SET_EMPLOYEE_API_KEY](state, key: string) {
			state.EmployeeAPIKey = key;
		},
	},
});
