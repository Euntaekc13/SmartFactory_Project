import { request } from "./index";


export const machine = {
  fetch() {
    return request('get','/')
  }
}