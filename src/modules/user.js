import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

const User = {
  USER_JOIN: 'USER_JOIN',
  USER_GET: 'USER_GET',
  USER_LIST_GET: 'USER_LIST_GET'
}

const initialState = fromJS({
  users: [],
  me: {}
})

export default createReducer(initialState, {
  [User.USER_JOIN]: (state, { payload }) => {
    return state.set('me', payload)
  },

  [User.USER_GET]: (state, { payload }) => {
    return state.set('me', payload)
  },

  [User.USER_LIST_GET]: (state, { payload }) => {
    return state.set('users', payload)
  }
})

export function joinSuccess(user) {
  return {
    type: User.USER_JOIN,
    payload: user
  }
}

export function getUserListSuccess(users) {
  return {
    type: User.USER_LIST_GET,
    payload: users
  }
}

export function getUserSuccess(user) {
  return {
    type: User.USER_GET,
    payload: user
  }
}

export function join(userData) {
  return (dispatch, getState, api) => {
    api.user.createUser(userData).then(response => {
      const user = response.data
      dispatch(joinSuccess(user))
    })
  }
}

export function getUserList() {
  return (dispatch, getState, api) => {
    api.user.fetchUserList().then(response => {
      const users = response.data
      dispatch(getUserListSuccess(users))
    })
  }
}

export function getUser(id) {
  return (dispatch, getState, api) => {
    api.user.fetchUser(id).then(response => {
      const user = response.data
      dispatch(getUserSuccess(user))
    })
  }
}
