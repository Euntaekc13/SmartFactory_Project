import { sampleApi } from '../api/sampleAPI'

const stateInit = {
  sampleStoreObject: {
    id: null,
    ex: null
  }
}

export const sample = {
  namespaced: true,

  state: {
    sampleStoreObject: { ...stateInit.sampleStoreObject },
    sampleStoredata: null
  },
  getters: {
    sampleStoreObject: state => state.sampleStoreObject,
    sampleStoredata: state => state.sampleStoredata
  },
  mutations: {
    SET_SAMPLE_OB(state, res) {
      state.sampleStoreObject = res
    }
  },
  actions: {
    FETCH_SAMPLE({ commit }) {
      //commit은 mutation으로 보내주기 위함
      return sampleApi.getEx().then(res => {
        commit('SET_SAMPLE_OB', res)
      })
    },
    SAMPLE_POST(_, { exampleData }) {
      //mutation으로 보내주지 않아도 되기 때문에 _,로 표시
      return sampleApi
        .postEX(exampleData)
        .then(console.log('보내기 성공'))
        .catch(error => {
          console.log('sample - error', error)
        })
    }
  }
}
