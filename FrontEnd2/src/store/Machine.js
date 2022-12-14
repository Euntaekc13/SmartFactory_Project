import { machine } from '../api/machine'

const InitMachine = [
  {
    id: null,
    machine_name: null,
    machine_status: null,
    machine_image: null,
    manager: null,
    information: null,
    mqtt_name: null,
    mqtt_port: null,
    mqtt_topic: null
  }
]

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
    GET_Machine_MUTATION(state, data) {
      state.Machine = data.data.machine
    }
  },
  actions: {
    GET_Machine({ commit }) {
      return (
        machine
          // request
          .getMachine()
          // response
          .then(data => {
            console.log('Get Machine 성공 : ', data)
            // response 를 저장하는데, mutation 에 있는 함수를 호출해서 경로를 잡는다.
            commit('GET_Machine_MUTATION', data.data)
          })
          .catch(error => {
            console.log('Get Machine 실패 : ', error)
          })
      )
    }
  }
}
