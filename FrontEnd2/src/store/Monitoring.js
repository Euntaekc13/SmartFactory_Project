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
      // console.log('mutations 안쪽 dailyProductivityUpdate - data : ', data)
      let totalQty = 0
      let goodSetQty = 0
      let failureQty = 0

      let dailyGoodSetQty = 0
      let dailyFailureQty = 0

      let i = 0
      let j = 0
      // console.log('여기를 잡아야함 ', data.test_result.length)
      if (data.test_result.length !== 0) {
        for (i = 0; i < data.test_result.length; i++) {
          data.test_result[i].final_result == 1 ? goodSetQty++ : failureQty++
        }
      } else {
        goodSetQty = 0
        failureQty = 0
        totalQty = 0
      }

      // console.log('여기를 잡아야함 ', data.today_final_result)

      if (data.today_final_result.length !== 0) {
        for (j = 0; j < data.today_final_result.length; j++) {
          data.today_final_result[j].final_result == 1 ? dailyGoodSetQty++ : dailyFailureQty++
        }
      } else {
        dailyGoodSetQty = 0
        dailyFailureQty = 0
      }

      state.dailyProductivity.total = totalQty
      state.dailyProductivity.goodSet = goodSetQty
      state.dailyProductivity.failure = failureQty

      let dailyTotalQty = dailyGoodSetQty + dailyFailureQty

      state.dailyProductivity.dailyTotal = dailyTotalQty
      state.dailyProductivity.dailyGoodSet = dailyGoodSetQty
      state.dailyProductivity.dailyFailure = dailyFailureQty
    },
    cycleCountUpdate(state, data) {
      // console.log('mutations 안쪽 cycleCountUpdate - data : ', data)
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
    },
    assignedUserUpdate(state, data) {
      // console.log('mutations 안쪽 assignedUserUpdate - data : ', data)
      state.assignedUser.userName = data.manager.name
      state.assignedUser.userEmail = data.manager.email
      state.assignedUser.userPhone = data.manager.phone_number
      state.assignedUser.userImage = data.manager.user_image
    },
    assignedUserDelete(state, data) {
      // console.log('delete')
      // console.log('store monitoring mutation')
      // 여기서 data 는 함수가 선언된 부분에서 정한 null 값으로 전부 입력
      state.assignedUser.userName = data
      state.assignedUser.userEmail = data
      state.assignedUser.userPhone = data
      state.assignedUser.userImage = data

      state.dailyProductivity.dailyTotal = data
      state.dailyProductivity.dailyGoodSet = data
      state.dailyProductivity.dailyFailure = data

      state.dailyProductivity.total = data
      state.dailyProductivity.goodSet = data
      state.dailyProductivity.failure = data

      state.cycleCount.process1 = data
      state.cycleCount.process2 = data
      state.cycleCount.process3 = data
    }
  },
  actions: {
    getMonitoringInfoStoreAction({ commit }, { machineId }) {
      return getMonitoringInfoApi
        .taking(machineId)
        .then(result => {
          // console.log('getMonitoringInfoStoreAction 성공??', result.data.data)
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
