import { request } from './index'

export const user = {
  fetchAll() {
    return request('get', '/admin/auth/list')
  },
  create(name, employee_number, phone_number, password, authorization, email, user_img) {
    return request('post', '/admin/auth/join', {
      name,
      employee_number,
      phone_number,
      password,
      authorization,
      email,
      user_img
    })
  },
  delete(id) {
    return request('delete', `/admin/auth/delete/${id}`)
  }
}
