import moment from 'moment'

export function keyMirror(obj, extraKey) {
  let ret = {}
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.')
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = extraKey ? `${extraKey}_${key}` : key
    }
  }
  return ret
}

export function dateTimeToString(obj) {
  return moment(obj).format('YYYY-MM-DD HH:mm')
}

export function dateToString(obj) {
  return moment(obj).format('YYYY-MM-DD')
}

export function dateToDefaultString(obj) {
  return moment(obj).format('YYYYMMDD')
}
