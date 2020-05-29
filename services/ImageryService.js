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
  getToken() {
    return (apiClient.defaults.headers.common.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('user')).token
    }`)
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
  getImageries() {
    return apiClient.get('/api/imageries')
  },
  getImagery(id) {
    return apiClient.get('/api/users/imageries/' + id)
  },
  addImagery(data) {
    return apiClient.post('/api/imageries', data)
  }
}
