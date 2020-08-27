/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername (str) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

/**
 * @param {object} data
 * @returns {boolean}
 */
export function isnu (val) {
  return (val === null || val === undefined)
}

/**
 * @param {object} data
 * @returns {object}
 */
export function removeSpaces (data) {
  const obj = {}

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      obj[key] = !isnu(data[key]) ? String(data[key]).replace(/\s+/g, '') : ''
    }
  }
  return obj
}

/**
 * @param {object} tree
 * @param {string} pid
 * @returns {object} tree
 */
export function removeTreeitem (data, pid) {
  // const obj = {}
  // console.log(data, pid)

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === pid) {
      data.splice(i, 1)
      i--
    } else {
      if (data[i].childs && data[i].childs.length) {
        removeTreeitem(data[i].childs, pid)
      }
    }
  }

  return data
}

/**
 * @param {object} tree
 * @param {string} type
 * @param {number} identifying
 * @returns {object} tree
 */
export function filterTree (data, type, identifying) {
  // const obj = {}
  // console.log(data, type)

  for (let i = 0; i < data.length; i++) {
    if (data[i].childs && data[i].childs.length) {
      filterTree(data[i].childs, type, identifying)
    }

    if (data[i][type] === identifying) {
      // console.log(data[i])
      data.splice(i, 1)
      i--
    }
  }

  return data
}

/**
 * @param {object}
 * @returns {boolean}
 */

export function isObject (obj) {
  return Object.prototype.toString.call(obj).toLowerCase() === '[object object]'
}
