import { createStore } from 'vuex'

export default createStore({
  state: {
    orgJWT: "",
    emplJWT: "",
    isAffiliate: false,
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
    }
  },
})
