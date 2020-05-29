/* eslint-disable no-console */
// import axios from 'axios'
import ImageryService from '@/services/ImageryService.js'

export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER_DATA(state, userData) {
    state.user = userData
    localStorage.setItem('user', JSON.stringify(userData))
    // eslint-disable-next-line dot-notation
    // axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
    ImageryService.getToken()
  },
  CLEAR_USER_DATA() {
    localStorage.removeItem('user')
    location.reload()
  }
}

export const actions = {
  register({ commit }, credentials) {
    return ImageryService.addUser(credentials).then(({ data }) => {
      // console.log('User data is: ', data)
      commit('SET_USER_DATA', data)
    })
  },
  login({ commit }, credentials) {
    return ImageryService.loginUser(credentials).then(({ data }) => {
      // console.log('User data is: ', data)
      commit('SET_USER_DATA', data)
    })
  },
  logout({ commit }) {
    commit('CLEAR_USER_DATA')
  }
}

export const getters = {
  loggedIn(state) {
    return !!state.user
  }
}
