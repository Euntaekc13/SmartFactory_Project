// import { machine } from '../api/auth'

export const Machine = {
  namespaced: true,

  state: {
    data: {},
    data2: ''
  },
  getters: {},
  mutations: {
    FETCH_DATA(state, data) {
      state.data = data
    }
  },
  actions: {}
}
