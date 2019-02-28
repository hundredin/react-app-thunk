import axios from 'axios'

function getAllPosts() {
  return axios.get('http://localhost:8080/posts').then(response => {
    return response
  })
}

export default {
  getAllPosts
}
