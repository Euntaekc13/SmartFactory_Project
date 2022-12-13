import { request } from './index'

export const getDailyCountInfoApi = {
  taking(machineId) {
    console.log('getDailyCountInfoApi api page : ', machineId)
    return request('get', `/monitoring/${machineId}`, { machineId })
  }
}
