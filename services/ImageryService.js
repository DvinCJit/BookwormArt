import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

export default {
  getImageries() {
    return apiClient.get('/api/imageries')
  },
  getImagery(id) {
    // eslint-disable-next-line no-undef
    return apiClient.get('/api/imageries/' + id)
  },
  addImagery(data) {
    return apiClient.post('/api/imageries', data)
  }
}
