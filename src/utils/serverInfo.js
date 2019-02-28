import { keyMirror } from './utils'
import storage from './storage'

export const STORAGE_KEY_API_PHASE = 'reactapp.api.phase'
export const STORAGE_KEY_API_PHASE_LOCAL = 'reactapp.api.phase.local'

const ApiPhase = keyMirror({
  production: null,
  develop: null,
  local: null
})

export const clearLocalApiPhase = () =>
  storage.removeItem(STORAGE_KEY_API_PHASE_LOCAL)

export const setLocalApiPhase = phase =>
  storage.setItem(STORAGE_KEY_API_PHASE_LOCAL, phase)

const getLocalApiPhase = () => {
  const phase = storage.getItem(STORAGE_KEY_API_PHASE_LOCAL)
  if (!phase) {
    console.log('phase!')
    const P = ApiPhase.develop
    setLocalApiPhase(P)
    return P
  }

  return phase
}

const ReactApp = {
  Server: {
    production: 'http://reactapp.com:8080',
    develop: 'http://dev.reactapp.com:8080',
    local: 'http://local.reactapp.com:8080'
  },
  Host: {
    production: 'reactapp.com',
    develop: 'dev.reactapp.com',
    local: 'local.reactapp.com'
  }
}

export const getApiPhase = () => {
  const host = window.location.hostname
  if (host === ReactApp.Host.local) return getLocalApiPhase()

  const phase = storage.getItem(STORAGE_KEY_API_PHASE_LOCAL)
  if (!phase) {
    const P =
      Object.keys(ApiPhase).find(P => {
        return ReactApp.Host[P] === window.location.hostname
      }) || ApiPhase.production
    storage.setItem(STORAGE_KEY_API_PHASE, P)
    return P
  }

  return phase
}

export const getApiServerURL = () => {
  const apiPhase = getApiPhase()
  const host = window.location.hostname

  if (__NOT_PRODUCTION__) console.log({ host, apiPhase })

  // LOCAL 만 선택 가능.
  switch (host) {
    case ReactApp.Host.production:
      return ReactApp.Server.production
    case ReactApp.Host.develop:
      return ReactApp.Server.develop
    default:
      return ReactApp.Server[apiPhase] || ReactApp.Server.local
  }
}
