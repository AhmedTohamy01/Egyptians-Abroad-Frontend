import axios from 'axios'

const getBaseUrl = () => {
  return 'http://localhost:5000'
}

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  user: {
    signup(payload) {
      return apiClient.post('/users/signup', payload)
    },
    login(payload) {
      return apiClient.post('/users/login', payload)
    },
  },
  post: {},
  comment: {},
}
