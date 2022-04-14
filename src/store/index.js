import { createStore } from 'vuex'

export default createStore({
  state: {
    orgJWT: "",
    emplJWT: "",

    isAffiliate: false, // является ли организация филиалом

    outlets: [{
      id: 0,
      name: "loading..."
    }],

    employees: [],
  },
  mutations: {
    setOrgJWT(state, jwt) {
      state.orgJWT = jwt
    },

    setEmplJWT(state, jwt) {
      state.emplJWT = jwt
    },

    setAffiliate(state, bool) {
      state.isAffiliate = bool
    },

    setOutlets(state, outlets) {
      state.outlets = outlets
    },

    setEmployees(state, employees) {
      state.employees = employees
    }
  },

  getters: {
    getEmployeeByID(state) {
      return (id) => {
        for (let i = 0; i < state.employees.length; i++) {
          if (state.employees[i].id == id)
            return state.employees[i];
        }
        return {};
      }
    }
  }
})
