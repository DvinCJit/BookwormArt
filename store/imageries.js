import ImageryService from '@/services/ImageryService.js'

export const state = () => ({
  // userImageries: [],
  imageries: [],
  imagery: null
})

export const mutations = {
  SET_IMAGERIES(state, imageries) {
    state.imageries = imageries
  },
  SET_IMAGERY(state, imagery) {
    state.imagery = imagery
  }
  // SET_USER_IMAGERIES(state, userImageries) {
  //   state.userImageries = userImageries
  // }
}

export const actions = {
  fetchImageries({ commit }) {
    return ImageryService.getImageries().then((response) => {
      commit('SET_IMAGERIES', response.data)
    })
  },
  fetchImagery({ commit }, id) {
    return ImageryService.getImagery(id).then((response) => {
      // eslint-disable-next-line no-console
      console.log(response)
      commit('SET_IMAGERY', response.data)
    })
  }
  // fetchMyImageries({ commit }, id) {
  //   return ImageryService.getMyImageries(id).then((response) => {
  //     // eslint-disable-next-line no-console
  //     return (
  //       ({ myImageries: response.data },
  //       // eslint-disable-next-line no-console
  //       console.log('User Imageries: ', response)),
  //       commit('SET_USER_IMAGERIES', this.myImageries)
  //     )
  //   })
  // }
}
