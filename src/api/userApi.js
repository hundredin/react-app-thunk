import { fetchGet, fetchPost } from '../utils/fetchUtils'

function fetchUser(userId) {
  return fetchGet(`/user/${userId}`)
}

function fetchUserList() {
  return fetchGet(`/users`)
}

function createUser(userData) {
  return fetchPost(`/users`, userData)
}

export default {
  fetchUser,
  fetchUserList,
  createUser
}
