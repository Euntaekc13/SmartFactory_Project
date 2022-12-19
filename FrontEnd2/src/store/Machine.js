import { machine } from '../api/machine'

const InitMachine = []
const object = {}

export const Machine = {
  namespaced: true,

  state: {
    Machine: InitMachine,
    machine1: object,
    machine2: object,
    machine3: object,
    machine4: object
  },
  getters: {
    Machine: state => state.Machine,
    machine1: state => state.machine1,
    machine2: state => state.machine2,
    machine3: state => state.machine3,
    machine4: state => state.machine4
  },
  mutations: {
    GET_MACHINE_MUTATION(state, data) {
      state.Machine = data.data.machine
      // console.log('GET_MACHINE_MUTATION - state.Machine : ', state.Machine)
    },
    GET_PROCESSLIST(state, data) {
      state.machine1 = data[0]
      state.machine2 = data[1]
      state.machine3 = data[2]
      state.machine4 = data[3]
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
            console.log('Get Machine 성공 : ', data.data.data.machine)
            // response 를 저장하는데, mutation 에 있는 함수를 호출해서 경로를 잡는다.
            const machine = data.data.data.machine
            const result = maching(machine)
            console.log('함수결과', result)

            commit('GET_MACHINE_MUTATION', data.data)
            commit('GET_PROCESSLIST', result)
          })
          .catch(error => {
            console.log('Get Machine 실패 : ', error)
          })
      )
    }
  }
}

function maching(data) {
  let processList = {}
  for (let i = 0; i < data.length; i++) {
    processList[i] = data[i]
  }
  return processList
}
