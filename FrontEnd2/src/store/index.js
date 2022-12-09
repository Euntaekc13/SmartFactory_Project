import Vue from 'vue'
import Vuex from 'vuex'

import { Machine } from './Machine'
import { Auth } from './Auth'
// import { SampleStore } from './SampleStore'
import { setAuthInHeader } from '../api/auth'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    Auth: Auth,
    Machine: Machine
    // SampleStore: SampleStore
  },
  plugins: [createPersistedState()],
  state: {
    token: localStorage.getItem('token') || null
  },
  mutations: {
    LOGINED(state, token) {
      if (!token) return
      state.token = token //token 갱신
      localStorage.setItem('token', token) //localstorage에 token 저장
      setAuthInHeader(token) //header에 token 세팅
    },
    LOGOUTED(state, token) {
      if (!token) return
      localStorage.removeItem('token')
    }
  }
})

const { token } = localStorage
store.commit('LOGINED', token)

export default store
