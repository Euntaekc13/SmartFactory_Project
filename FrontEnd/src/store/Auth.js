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
    LOGIN(state, data) {
      if (!data.token) return
      // 여기 아래 user에 대한 내용을 넣어야 한다.
      state.TokenUser = data.user //token 갱신
      localStorage.setItem('token', data.token) //localstorage에 token 저장

      setAuthInHeader(data.token) //header에 token 세팅
    }
  },
  actions: {
    LOGIN_AUTH({commit}, {employee_number, password}) {
      return auth.login(employee_number,password).then((res)=>{
        console.log('Login 성공 : ', res);
        commit('LOGIN', res);
      }).catch((res)=>{
        console.log('Login 실패 : ', res);
      })
      // .finally(()=>{
      //   console.log('final');
      // })
    }
  }
}
