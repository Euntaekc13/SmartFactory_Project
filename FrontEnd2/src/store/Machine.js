import { machine } from '../api/machine'

const InitLine = [
  {
    id: null,
    machine_name: null,
    machine_status: null,
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
    Line: InitLine,
    data: '',
    data2: ''
  },
  getters: {
    Line: state => state.Line
  },
  mutations: {
    // FETCH_DATA(state, data) {
    //   state.data = data
    // },
    GET_LINE_MUTATION(state, data) {
      state.Line = data.data.machine
    }
  },
  actions: {
    GET_LINE({ commit }) {
      return (
        machine
          // request
          .getLine()
          // response
          .then(data => {
            console.log('Get Line 성공 : ', data)
            // response 를 저장하는데, mutation 에 있는 함수를 호출해서 경로를 잡는다.
            commit('GET_LINE_MUTATION', data.data)
          })
          .catch(error => {
            console.log('Get Line 실패 : ', error)
          })
      )
    }
  }
}
