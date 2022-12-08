// api 관련 내용들을 묶어둔 곳이다.
import axios from 'axios'
import router from '../router'

// const DOMAIN = process.env.API_DOMAIN
const DOMAIN = process.env.VUE_APP_API_DOMAIN
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
      if (status === UNAUTHORIZED) return onUnauthorized()
      throw Error(result)
    })
}



