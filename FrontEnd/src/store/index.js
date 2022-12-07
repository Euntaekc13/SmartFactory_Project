import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { Machine } from './Machine'
import { Auth } from './Auth'
// import { SampleStore } from './SampleStore'


const store = new Vuex.Store({
  modules: {
    Auth: Auth,
    Machine: Machine,
    // SampleStore: SampleStore
  }
})

// const { token } = localStorage
// store.commit('LOGINED', token)

export default store
