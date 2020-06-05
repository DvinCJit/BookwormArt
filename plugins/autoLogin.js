export default function({ store }) {
  const userString = localStorage.getItem('user')
  if (userString) {
    const userData = JSON.parse(userString)
    store.commit('users/SET_USER_DATA', userData)
  }
}
