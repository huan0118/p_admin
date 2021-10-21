/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {object} data
 * @returns {boolean}
 */
export function isnu(val) {
  return val === null || val === undefined;
}

/**
 * @param {object} data
 * @returns {object}
 */
export function removeSpaces(data) {
  const obj = {};

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      obj[key] = !isnu(data[key]) ? String(data[key]).replace(/\s+/g, "") : "";
    }
  }
  return obj;
}

/**
 * @param {object}
 * @returns {boolean}
 */

export function isObject(obj) {
  return (
    Object.prototype.toString.call(obj).toLowerCase() === "[object object]"
  );
}
