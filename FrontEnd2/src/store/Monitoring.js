import { getMonitoringInfoApi } from '../api/monitoring'

const today = new Date()

const year = today.getFullYear()
const month = today.getMonth() + 1
const date = today.getDate()
const hour = today.getHours()
const minutes = today.getMinutes()
const seconds = today.getSeconds()
const getNowOrganized = () => `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`
console.log(getNowOrganized())

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
  failure: null,
  dailyTotal: null,
  dailyGoodSet: null,
  dailyFailure: null
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
    dailyProductivity: dailyProductivity,
    cycleCount: cycleCount,
    assignedUser: assignedUser
  },
  getters: {
    dailyProductivity: state => state.dailyProductivity,
    cycleCount: state => state.cycleCount,
    assignedUser: state => state.assignedUser
  },
  mutations: {
    dailyProductivityUpdate(state, data) {
      // 아직 daily 작업을 추가해야함
      console.log('mutations 안쪽 dailyProductivityUpdate - data : ', data)
      let totalQty = data.test_result.length
      let goodSetQty = 0
      let failureQty = 0

      let dailyGoodSetQty = 0
      let dailyFailureQty = 0

      let i = 0
      let j = 0

      for (i = 0; i < totalQty; i++) {
        data.test_result[i].final_result == 1 ? goodSetQty++ : failureQty++
      }
      // for (j = 0; j < totalQty; j++) {
      //   console.log('today')
      // }

      console.log('mutations 안쪽 dailyProductivityUpdate - goodSetQty : ', goodSetQty)
      console.log('mutations 안쪽 dailyProductivityUpdate - failureQty : ', failureQty)
      state.dailyProductivity.total = totalQty
      state.dailyProductivity.goodSet = goodSetQty
      state.dailyProductivity.failure = failureQty

      let dailyTotalQty = dailyGoodSetQty + dailyFailureQty

      state.dailyProductivity.dailyTotal = dailyTotalQty
      state.dailyProductivity.dailyGoodSet = dailyGoodSetQty
      state.dailyProductivity.dailyFailure = dailyFailureQty
    },
    cycleCountUpdate(state, data) {
      console.log('mutations 안쪽 cycleCountUpdate - data : ', data)
      let i = 0
      for (i = 0; i <= 2; i++) {
        switch (data.part[i].PartDefaultId) {
          case 1:
            state.cycleCount.process1 = data.part[i].count
            break
          case 2:
            state.cycleCount.process2 = data.part[i].count
            break
          case 3:
            state.cycleCount.process3 = data.part[i].count
            break
        }
      }
      console.log('mutations 안쪽 cycleCountUpdate - data.process1 : ', state.cycleCount.process1)
      console.log('mutations 안쪽 cycleCountUpdate - data.process2 : ', state.cycleCount.process2)
      console.log('mutations 안쪽 cycleCountUpdate - data.process3 : ', state.cycleCount.process3)
    },
    assignedUserUpdate(state, data) {
      console.log('mutations 안쪽 assignedUserUpdate - data : ', data)
      state.assignedUser.userName = data.manager.name
      state.assignedUser.userEmail = data.manager.email
      state.assignedUser.userPhone = data.manager.phone_number
      state.assignedUser.userImage = data.manager.user_image
    },
    assignedUserDelete(state, data) {
      console.log('delete')
      console.log('store monitoring mutation')
      // 여기서 data 는 함수가 선언된 부분에서 정한 null 값으로 전부 입력
      state.assignedUser.userName = data
      state.assignedUser.userEmail = data
      state.assignedUser.userPhone = data
      state.assignedUser.userImage = data
    }
  },
  actions: {
    getMonitoringInfoStoreAction({ commit }, { machineId }) {
      return getMonitoringInfoApi
        .taking(machineId)
        .then(result => {
          console.log('getMonitoringInfoStoreAction 성공?', result)
          commit('dailyProductivityUpdate', result.data.data)
          commit('cycleCountUpdate', result.data.data)
          commit('assignedUserUpdate', result.data.data)
        })
        .catch(error => {
          console.log('getMonitoringInfoStoreAction 실패 : ', error)
        })
    }
  }
}
