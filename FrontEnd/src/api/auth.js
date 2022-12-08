import { request } from './index'
import axios from 'axios'

export const auth = {
  login(employee_number, password) {
    return request('post', '/login', { employee_number, password })
  }
}

// axios에 토큰 정보를 넣을땐 token 값 뺄땐 null 값을 준다.
export const setAuthInHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null
}
