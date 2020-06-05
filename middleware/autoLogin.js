export default function({ store, error }) {
  const userString = localStorage.getItem('user')
  if (userString) {
    const userData = JSON.parse(userString)
    store.commit('SET_USER_DATA', userData)
  }
}
