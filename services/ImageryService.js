import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
  }
})

export default {
  interceptError() {
    return apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        // eslint-disable-next-line no-console
        console.log('axios error: ', error)
        if (error.response.status === 401) {
          // eslint-disable-next-line no-console
          console.log('axios error: ', error)
          // this.$store.dispatch('users/logout')
          localStorage.clear()
          location.reload()
        }
        return Promise.reject(error)
      }
    )
  },
  getToken() {
    return (apiClient.defaults.headers.common.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).token
    }`)
  },
  persistToken() {
    if (JSON.parse(localStorage.getItem('user')).users.user !== null) {
      return (apiClient.defaults.headers.common.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem('user')).users.user.token
      }`)
    }
  },
  getImageries() {
    return apiClient.get('/api/homepage')
  },
  addUser(credentials) {
    return apiClient.post('/api/register', credentials)
  },
  loginUser(credentials) {
    return apiClient.post('/api/login', credentials)
  },
  getMyImageries(id) {
    return apiClient.get('/api/users/' + id)
  },
  getImagery(id) {
    return apiClient.get('/api/users/imageries/' + id)
  },
  addImagery(data) {
    return apiClient.post('/api/users/imageries/create', data)
  },
  updateImagery({ id, data }) {
    return apiClient.put('/api/users/imageries/edit/' + id, data)
  },
  deleteImagery({ data }) {
    return apiClient.post('/api/users/imageries/delete', data)
  },
  updateLikes({ data }) {
    return apiClient.post('api/users/imageries/edit', { data })
  },
  getUserLikes({ data }) {
    return apiClient.post('api/homepage', data)
  },
  countImageryLikes({ data }) {
    return apiClient.post('api/users/imageries/count', data)
  }
}
