import axios from 'axios'
import { getApiServerURL } from './serverInfo'

// require('es6-promise').polyfill()

export const API_URL = getApiServerURL()
export const LOCAL_HOST = 'local.reactapp.com'
export const DOMAIN =
  window.location.protocol +
  '//' +
  window.location.hostname +
  ':' +
  window.location.port

// axios global config
axios.defaults.baseURL = API_URL
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Cache'] = 'no-cache'
axios.defaults.withCredentials = true

/**
 * (private method) Object의 null값 제거 및 string의 trim을 통해 서버로 보낼 데이터의 전처리 과정을 진행합니다.
 * @param obj {object}
 * @returns {object}
 */
function _querify(obj) {
  Object.keys(obj).forEach(key => {
    let value = obj[key]

    // 추가할 value가 undefined, null 이면 삭제
    if (value == null || value == undefined) {
      delete obj[key]
      return
    }
    // 빈 스트링이나 빈 배열도 삭제
    if (isFinite(value.length) && value.length == 0) {
      delete obj[key]
      return
    }
    // 추가할 value가 string이면 trim
    if (typeof value == 'string') {
      obj[key] = value.replace(/^\s+|\s+$/g, '')
    }
  })
  return obj
}

/**
 * Object를 querystring으로 변형합니다.
 * 주의 - 복잡한 Object의 toString은 [object Obejct]로 전달될 수 있습니다.
 * @param params {object}
 * @returns {string}
 */
function queryString(params) {
  let query = []
  params = _querify(params)
  for (let key in params) {
    let value = params[key]
    query.push(`${key}=${encodeURIComponent(value)}`)
  }
  return query.join('&')
}

/**
 * json 데이터를 보내는 fetch 요청들의 wrapper 입니다.
 */
function fetchGetNoToken(url) {
  return axios.get(url, {
    headers: {},
    responseType: 'json'
  })
}

function fetchMethod(url, method, body, cancelTokenSource) {
  return axios(url, {
    method: method.toLowerCase(),
    url: url,
    data: body,
    cancelToken: cancelTokenSource ? cancelTokenSource.token : null
  })
}

/**
 * fetchGet (no request body)
 */
function fetchGet(url, cancelTokenSource) {
  return fetchMethod(url, 'get', {}, cancelTokenSource)
}

/**
 * fetchPost / fetchPut / fetchDelete
 * - stringify request body
 */
function fetchPost(url, body, cancelTokenSource) {
  return fetchMethod(url, 'post', body, cancelTokenSource)
}

function fetchPut(url, body) {
  return fetchMethod(url, 'put', body)
}

function fetchDelete(url, body) {
  return fetchMethod(url, 'delete', body)
}

/**
 * 동영상 업로드시 게이트웨이 url 태우지 않고 텐스에 직접 요청 날리는 멀티파트 폼 형식. 인증 토큰이나 adAccountId도 안넘김.
 */
function fetchDirectPostForm(url, formData, cancelTokenSource, onProgress) {
  return axios(url, {
    withCredentials: false,
    baseURL: '',
    method: 'post',
    data: formData,
    onUploadProgress: createProgressClosure(onProgress),
    cancelToken: cancelTokenSource ? cancelTokenSource.token : null,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).catch(e => {
    if (axios.isCancel(e)) throw e
  })
}

/**
 * 파일 업로드시에 프로그래스값을 받는 콜백
 * @param onProgress {function}
 */
const createProgressClosure = onProgress => {
  if (typeof onProgress !== 'function') return

  const minProgress = 0.001
  let startTime = null

  return progressEvent => {
    const { timeStamp, loaded, total } = progressEvent

    if (startTime === null) {
      startTime = timeStamp
    }
    const progress = Math.max(loaded / total, minProgress)
    const expectedRemainTime = (timeStamp - startTime) * (1 / progress - 1)
    onProgress(progress, expectedRemainTime)
  }
}

export {
  fetchGetNoToken,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
  queryString,
  fetchDirectPostForm
}
