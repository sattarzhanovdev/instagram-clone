import axios from "axios"

export const API = {
  login: (data) => axios.post('/token/', data),
  register: (data) => axios.post('/users/', data),
  getUser: (username) => axios.get(`/users/?search=${username}`),
  getUsers: () => axios.get(`/users/`),
  deleteUser: (accessToken, id) => axios.delete(`/users/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  editUser: (accessToken, id, data) => axios.put(`/users/${id}/`, data, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  getStories: (accessToken) => axios.get(`/stories/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  deleteStories: (accessToken, id) => axios.delete(`/stories/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  getPosts: (accessToken) => axios.get(`/posts/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  getStoriesById: (accessToken, id) => axios.get(`/stories/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  getUserStories: (id) => axios.get(`/users/${id}/stories/`),
  postStories: (accessToken, data) => axios.post('/stories/', data, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  deleteStories: (accessToken, id) => axios.delete(`/stories/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  follow: (accessToken, data) => axios.post(`/follow/`, data, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  unfollow: (accessToken, id) => axios.delete(`/follow/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  refreshToken: (data) => axios.post('/token/refresh/', data),
  like: (accessToken, data) => axios.post('/likes/', data, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  getLikes: (id) => axios.get(`/users/${id}/likes/`),
  dislike: (accessToken, id) => axios.delete(`/likes/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  save: (accessToken, data) => axios.post('/saves/', data, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  getSaves: (accessToken, id) => axios.get(`/users/${id}/saves/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  unsave: (accessToken, id) => axios.delete(`/saves/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  getComments: (id) => axios.get(`/posts/${id}/comments/`),
  post: (accessToken, data) => axios.post('/posts/', data, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  deletePost: (accessToken, id) => axios.delete(`/posts/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  postImages: (accessToken, data) => axios.post('/images/', data, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  postComments: (accessToken, data) => axios.post('/comments/', data, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  deleteComment: (accessToken, id) => axios.delete(`/comments/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }),
  getUsersPosts: (id) => axios.get(`/users/${id}/posts/`),
  getUsersSubscribers: (id) => axios.get(`/users/${id}/subscribers/`),
  getUsersSubscriptions : (id) => axios.get(`/users/${id}/subscriptions/`),
}