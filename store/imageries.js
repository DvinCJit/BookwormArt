import ImageryService from '@/services/ImageryService.js'

export const state = () => ({
  imageries: []
})

export const mutations = {
  SET_IMAGERIES(state, imageries) {
    state.imageries = imageries
  }
}

export const actions = {
  fetchImageries({ commit }) {
    return ImageryService.getImageries().then((response) => {
      commit('SET_IMAGERIES', response.data)
    })
  }
}
