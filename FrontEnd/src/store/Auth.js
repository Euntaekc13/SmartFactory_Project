import { auth } from '../api/auth'
import { setAuthInHeader } from '../api/auth'

// 유저 정보 수정 필요
const InitTokenUser = {
  id: null,
  employee_number: null,
  name: null,
  email: null,
  authorization: null
}

export const Auth = {
  namespaced: true,

  state: {
    TokenUser: InitTokenUser
  },
  getters: {
    TokenUser: state => state.TokenUser
  },
  mutations: {
    // LOGOIN 함수는 인수로 state 랑 data 를 갖는데,
    // state 는 위에 있는 state 이고
    // data 는 아래 commit에서 보내주는 response 로 받아온 데이터이다.
    LOGIN(state, data) {
      console.log('mutations 안쪽 LOGIN - data : ', data)
      if (!data.token) return
      // 여기 아래 user에 대한 내용을 넣어야 한다.
      state.TokenUser = data.data.user //token 갱신
      localStorage.setItem('token', data.token) //localStorage에 token 저장

      // api auth 에서 가져온 함수
      // localStorage 에는 위에서 저장하고 다음 동작에 사용될 토큰을 미리 headers 에 저장
      setAuthInHeader(data.token) //header에 token 세팅
    }
  },
  actions: {
    LOGIN_AUTH({ commit }, { employee_number, password }) {
      return (
        auth
          // request
          .login(employee_number, password)
          // response
          .then(data => {
            console.log('Login 성공 data : ', data)
            console.log('Login 성공 data.data: ', data.data)
            // response 를 저장하는데, mutation 에 있는 함수를 호출해서 경로를 잡는다.
            commit('LOGIN', data.data)
          })
          .catch(error => {
            console.log('Login 실패 : ', error)
          })
      )
      // .finally(()=>{
      //   console.log('final');
      // })
    }
  }
}
