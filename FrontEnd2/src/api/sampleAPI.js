import { request } from './index'

export const sampleApi = {
  postEX(exampleData) {
    return request('post', '/example', { exampleData })
  },
  getEx() {
    return request('get', '/example')
  }
}
