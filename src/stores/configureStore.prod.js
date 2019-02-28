import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'

import { routerMiddleware } from 'connected-react-router'

import createRootReducer from '../modules'
import api from '../api'

// LOCAL, DEV, SANDBOX
export default function configureStore(initialState, history) {
  const middleware = applyMiddleware(
    routerMiddleware(history),
    thunk.withExtraArgument(api)
  )

  const store = createStore(
    createRootReducer(history),
    initialState,
    middleware
  )

  return store
}
