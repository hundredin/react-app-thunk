import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const Post = {
  POST_FETCH_REQUESTED: 'POST_FETCH_REQUESTED',
  POST_FETCH_SUCCESS: 'POST_FETCH_SUCCESS',
  POST_FETCH_FAIL: 'POST_FETCH_FAIL'
}

const initialState = fromJS({
  posts: []
})

export default createReducer(initialState, {
  [Post.POST_FETCH_SUCCESS]: (state, { posts }) => {
    return state.set('posts', posts)
  },

  [Post.POST_FETCH_FAIL]: state => {
    return state.set('posts', initialState.get('posts'))
  }
})

export function fetchAllPosts(userId) {
  return {
    type: Post.POST_FETCH_REQUESTED,
    payload: {
      userId
    }
  }
}
