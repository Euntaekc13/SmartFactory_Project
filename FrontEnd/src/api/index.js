// api 관련 내용들을 묶어둔 곳이다.
import axios from 'axios'
import router from '../router'

// const DOMAIN = process.env.API_DOMAIN
const DOMAIN = process.env.VUE_APP_API_DOMAIN
// const DOMAIN = "http://192.168.0.16:3001"
const UNAUTHORIZED = 401
const onUnauthorized = () => {
  router.push('/login')
}

export const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data
  })
    .then(result => {result.data})
    .catch(result => {
      const { status } = result.response
      // if (status === UNAUTHORIZED) return onUnauthorized()
      throw Error(result)
    })
}

// 보드 관련된 함수들을 모두 여기서 사용한다.
// export const board = {
//   fetch() {
//     return request('get', '/board')
//   }
// }



