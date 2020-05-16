import ImageryService from '@/services/ImageryService.js'

export const state = () => ({
  imageries: [],
  imagery: {}
})

export const mutations = {
  SET_IMAGERIES(state, imageries) {
    state.imageries = imageries
  },
  SET_IMAGERY(state, imagery) {
    state.imagery = imagery
  }
}

export const actions = {
  fetchImageries({ commit }) {
    return ImageryService.getImageries().then((response) => {
      commit('SET_IMAGERIES', response.data)
    })
  },
  fetchImagery({ commit }, id) {
    return ImageryService.getImagery(id).then((response) => {
      commit('SET_IMAGERY', response.data)
    })
  }
}
