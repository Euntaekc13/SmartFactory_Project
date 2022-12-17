import { request } from './index'

export const history = {
  getHistoryData(historyData) {
    // console.log('get History Data information')
    return request('post', '/history', { historyData })
  }
}
