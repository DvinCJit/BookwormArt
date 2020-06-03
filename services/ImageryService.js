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
  deleteImagery(data) {
    return apiClient.post('/api/users/imageries/delete', data)
  }
}
