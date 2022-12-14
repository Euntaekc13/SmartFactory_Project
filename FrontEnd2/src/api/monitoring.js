import { request } from './index'

export const getMonitoringInfoApi = {
  taking(machineId) {
    console.log('getDailyCountInfoApi api page : ', machineId)
    return request('get', `/monitoring/${machineId}`)
  }
}
