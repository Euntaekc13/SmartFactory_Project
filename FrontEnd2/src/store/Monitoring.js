import { getMonitoringInfoApi } from '../api/monitoring'

const cycleCount = {
  process1: null,
  process1Max: null,
  process2: null,
  process2Max: null,
  process3: null,
  process3Max: null
}

const dailyProductivity = {
  total: null,
  goodSet: null,
  failure: null
}

const assignedUser = {
  userName: '',
  userEmail: '',
  userPhone: '',
  userImage: ''
}

export const Monitoring = {
  namespaced: true,

  state: {
    dailyProductivity,
    cycleCount,
    assignedUser
  },
  getters: {
    dailyProductivity: state => state.dailyProductivity,
    cycleCount: state => state.cycleCount,
    assignedUser: state => state.assignedUser
  },
  mutations: {
    dailyProductivityUpdate(state, data) {
      console.log('mutations 안쪽 dailyProductivityUpdate - data : ', data)
      // state.dailyProductivity.total = data.total
      // state.dailyProductivity.goodSet = data.goodSet
      // state.dailyProductivity.userPhone = data.failure
    },
    cycleCountUpdate(state, data) {
      console.log('mutations 안쪽 cycleCountUpdate - data : ', data)
      // state.cycleCount.process1 = data.part.process1
      // state.cycleCount.process1Max = data.process1
      // state.cycleCount.process2 = data.process2
      // state.cycleCount.process2Max = data.process2
      // state.cycleCount.process3 = data.process3
      // state.cycleCount.process3Max = data.process3
    },
    assignedUserUpdate(state, data) {
      console.log('mutations 안쪽 assignedUserUpdate - data : ', data)
      // state.assignedUser.userName = data.manager
      // state.assignedUser.userEmail = data.userEmail
      // state.assignedUser.userPhone = data.userPhone
      // state.assignedUser.userImage = data.userImage
    }
  },
  actions: {
    getMonitoringInfoStoreAction({ commit }, { machineId }) {
      return getMonitoringInfoApi
        .taking(machineId)
        .then(result => {
          console.log('getMonitoringInfoStoreAction 성공?', result)
          commit('dailyProductivityUpdate', result.data)
          commit('cycleCountUpdate', result.data)
          commit('assignedUserUpdate', result.data)
        })
        .catch(error => {
          console.log('getMonitoringInfoStoreAction 실패 : ', error)
        })
    }
  }
  // FETCH_SAMPLE({ commit }) {
  //   //commit은 mutation으로 보내주기 위함
  //   return sampleApi.getEx().then(res => {
  //     console.log(res)
  //     commit('SET_SAMPLE_OB', res)
  //   })
  // }
  //////////////////////////////////////////////////////////////
  // SAMPLE_POST(_, { exampleData }) {
  //   //mutation으로 보내주지 않아도 되기 때문에 _,로 표시
  //   return sampleApi
  //     .postEX(exampleData)
  //     .then(console.log('보내기 성공'))
  //     .catch(error => {
  //       console.log('sample - error', error)
  //     })
  // }
}
