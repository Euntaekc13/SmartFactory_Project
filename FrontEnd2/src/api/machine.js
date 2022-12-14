import { request } from './index'

export const machine = {
  // fetch() {
  //   return request('get', '/')
  // },
  getLine() {
    console.log('get Line information')
    return request('get', '/machine')
  }
}
