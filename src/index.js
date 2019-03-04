import '@babel/polyfill'
import './assets/styles.css'
import React from 'react'
import App from './containers/app'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { Map } from 'immutable'
import configureStore from './stores/configureStore'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { createBrowserHistory } from 'history'

const initialState = Map()
const history = createBrowserHistory()
const store = configureStore(initialState, history)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
