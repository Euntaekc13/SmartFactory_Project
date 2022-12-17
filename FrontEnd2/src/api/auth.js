import { request } from './index'
import axios from 'axios'

export const auth = {
  login(employee_number, password) {
    // console.log('auth api page : ', employee_number, password)
    return request('post', '/auth/login', { employee_number, password })
  }
}
// axios에 토큰 정보를 넣을땐 token 값 뺄땐 null 값을 준다.
// => axios 를 처리할 때마다 headers 에 token 을 담아주는데 이렇게 함수로 만들어 놓으면 default 로
// 토큰이 담겨서 보내진다.
export const setAuthInHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `${token}` : null
}
