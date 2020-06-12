import createPersistedState from 'vuex-persistedstate'
import ImageryService from '../services/ImageryService'

export default ({ store, isHMR }) => {
  if (isHMR) return

  window.onNuxtReady(() => {
    // eslint-disable-next-line no-console
    console.log('loaded!')
    createPersistedState({
      key: 'user',
      paths: ['users.user']
    })(store)

    ImageryService.interceptError()
    // ImageryService.persistToken()
  })
}
