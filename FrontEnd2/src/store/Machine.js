import { machine } from '../api/machine'

const InitMachine = []

export const Machine = {
  namespaced: true,

  state: {
    Machine: InitMachine
  },
  getters: {
    Machine: state => state.Machine
  },
  mutations: {
    // FETCH_DATA(state, data) {
    //   state.data = data
    // },
    GET_MACHINE_MUTATION(state, data) {
      console.log('GET_MACHINE_MUTATION - first : ', data.data)

      state.Machine = data.data.machine
      console.log('GET_MACHINE_MUTATION - first : ', state.Machine)
    }
  },
  actions: {
    GET_MACHINE({ commit }) {
      return (
        machine
          // request
          .getMachine()
          // response
          .then(data => {
            console.log('Get Machine 성공 : ', data)
            // response 를 저장하는데, mutation 에 있는 함수를 호출해서 경로를 잡는다.
            commit('GET_MACHINE_MUTATION', data.data)
          })
          .catch(error => {
            console.log('Get Machine 실패 : ', error)
          })
      )
    }
  }
}
