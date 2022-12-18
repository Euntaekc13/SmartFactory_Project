import { user } from '../api/user'

const AllUser = []

export const User = {
  namespaced: true,

  state: {
    AllUser: AllUser
  },
  getters: {
    AllUser: state => state.AllUser
  },
  mutations: {
    FETCH_USER(state, data) {
      state.AllUser = data.user
    }
  },
  actions: {
    FETCH_ALL({ commit }) {
      return user
        .fetchAll()
        .then(res => {
          commit('FETCH_USER', res.data.data)
        })
        .catch(err => {
          console.log('store fetch userall: ', err)
        })
    },
    CREATE_USER({ dispatch }, { name, employee_number, phone_number, password, authorization, email, user_image }) {
      return user
        .create(name, employee_number, phone_number, password, authorization, email, user_image)
        .then(() => {
          console.log('store create user')
          dispatch('FETCH_ALL')
        })
        .catch(err => {
          console.log('store create user', err)
        })
    },
    DELETE_USER({ dispatch }, id) {
      return user
        .delete(id)
        .then(() => {
          dispatch('FETCH_ALL')
        })
        .catch(err => {
          console.log('store DELETE_USER', err)
        })
    }
  }
}
