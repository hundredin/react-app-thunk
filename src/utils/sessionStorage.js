// 세션 스토리지 사용시 브라우저 호환하지 않으면 polyfill로 메모리에 저장함.
// 특정(저가) 모바일 브라우저와 시큐리티 모드 일때 로컬 스토리지 지원하지 않음.

const __sessionStorage = (function() {
  try {
    let testKey = '__ls.test__'
    sessionStorage.setItem(testKey, testKey)
    sessionStorage.removeItem(testKey)
    return sessionStorage
  } catch (e) {
    return createStorage()
  }
})()

// this pseudo-storage doesn't support storage.length or storage.key(idx)
function createStorage() {
  let storage = {}
  return {
    setItem: function(key, value) {
      storage[key] = value
    },
    getItem: function(key) {
      return storage[key]
    },
    removeItem: function(key) {
      delete storage[key]
    },
    clear: function() {
      storage = {}
    },
  }
}

export default __sessionStorage
