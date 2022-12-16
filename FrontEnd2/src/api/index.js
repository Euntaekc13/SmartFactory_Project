// api 관련 내용들을 묶어둔 곳이다.
import axios from 'axios'
import router from '../router'

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
    .then(result => {
      console.log('api/index.js - .then - result : ', result)
      console.log('api/index.js - .then - result.data : ', result.data)
      return result
    })
    .catch(result => {
      const { status } = result.response
      if (status === UNAUTHORIZED) return onUnauthorized()
      throw Error(result)
      // if ()
    })
}
