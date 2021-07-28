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
    getMyUserInfo() {
      return apiClient.get('/users/me')
    },
    getOtherUserInfo(userId) {
      return apiClient.get(`/users/${userId}`)
    },
    updateMyUserInfo(payload) {
      return apiClient.patch('/users/me', payload)
    },
    uploadMyUserAvatar(payload) {
      return apiClient.post('/users/me/avatar', payload)
    },
    getUserAvatar(userId) {
      return `${getBaseUrl()}/users/${userId}/avatar`
    },
    logout() {
      return apiClient.post('/users/logout')
    },
  },
  post: {
    addNewPost(payload) {
      return apiClient.post('/posts/new', payload)
    },
    getMyUserPosts(limit, skip) {
      return apiClient.get(
        `/posts/me?limit=${limit}&skip=${skip}&sortBy=createdAt:desc`
      )
    },
    getAllPosts(limit, skip) {
      return apiClient.get(
        `/posts?limit=${limit}&skip=${skip}&sortBy=createdAt:desc`
      )
    },
    getOnePost(postId) {
      return apiClient.get(`/posts/${postId}`)
    },
  },
  comment: {
    addNewComment(postId, payload) {
      return apiClient.post(`/comments/${postId}/new`, payload)
    },
    getPostComments(postId, limit, skip) {
      return apiClient.get(
        `/comments?postId=${postId}&limit=${limit}&skip=${skip}&sortBy=createdAt:asc`
      )
    },
  },
}
