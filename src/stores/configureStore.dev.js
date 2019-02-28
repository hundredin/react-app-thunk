import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { routerMiddleware } from 'connected-react-router'

import createRootReducer from '../modules'
import api from '../api'

// LOCAL, DEV, SANDBOX
export default function configureStore(initialState, history) {
  const middleware = applyMiddleware(
    routerMiddleware(history),
    thunk.withExtraArgument(api),
    logger
  )

  const store = createStore(
    createRootReducer(history),
    initialState,
    composeWithDevTools(middleware)
  )

  // if (module.hot) {
  //   console.log('hot hot')
  //   module.hot.accept('../modules', () => {
  //     const nextRootReducer = require('../modules').default
  //     store.replaceReducer(nextRootReducer(history))
  //   })
  // }

  return store
}
