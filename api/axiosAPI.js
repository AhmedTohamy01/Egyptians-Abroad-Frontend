import axios from 'axios'

let token = ''
// this code because Next.js don't give access to window object in SSR mode.
if (typeof window !== 'undefined') {
  token = window.localStorage.getItem('EgAbroadToken')
  // here we can access window object
}

const getBaseUrl = () => {
  return 'http://localhost:5000'
}

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
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
    getUserInfo() {
      return apiClient.get('/users/me')
    },
		getUserAvatar(userId) {
			return `${getBaseUrl()}/users/${userId}/avatar`
		}
  },
  post: {},
  comment: {},
}
