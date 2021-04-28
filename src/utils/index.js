/* eslint-disable no-prototype-builtins */
import md5 from "js-md5";
import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";
import _ from "lodash";
export function isUndef(v) {
  return v === undefined || v === null;
}

export function isDef(v) {
  return v !== undefined && v !== null;
}

export function isDefstr(v) {
  return v !== undefined && v !== null && v !== "";
}

export function isPrimitive(value) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "symbol" ||
    typeof value === "boolean"
  );
}
/**
 *
 * @param {Object} params
 * @returns {string}
 */
export function signUtil(params) {
  let newParams = { ...params };
  let fields = isDef(newParams.except_field)
    ? newParams.except_field.split(",")
    : [];
  let arr = fields.length ? fields : [];

  for (let i = 0; i < arr.length; i++) {
    delete newParams[arr[i]];
  }
  delete newParams.sign;
  delete newParams.except_field;
  let signs = [];
  let keys = Object.keys(newParams);
  keys.sort().forEach(e => {
    if (isDefstr(newParams[e])) {
      signs.push(newParams[e]);
    } else {
      console.warn("With escape field");
    }
  });
  return keys.length
    ? md5(signs.join("&") + "&" + process.env.VUE_APP_API_KEY)
    : md5("&" + process.env.VUE_APP_API_KEY);
}

/**
 *
 * @param {Object} data
 * @returns {string}
 */
export function signPrams(data) {
  let wants = isDef(data.want_except) ? data.want_except.split(",") : [];
  if (!wants.length) {
    return data;
  }
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (wants.includes(key)) {
        data[key] = Base64.stringify(Utf8.parse(data[key]));
      }
    }
  }
  delete data.want_except;

  return data;
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return timeStr;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, " ") +
      '"}'
  );
}

/**
 * @param {Array}
 * @returns {Array}
 */

export function flat(arr) {
  if (!Array.isArray(arr)) {
    return;
  }
  const res = [];
  for (const item of arr) {
    if (item.children) {
      res.push(...flat(item.children));
    }
    res.push(item);
  }

  return res;
}
export function flatObject(array) {
  const res = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i].children)) {
      res.push(...flatObject(array[i].children));
    }
    let item = _.cloneDeep(array[i]);
    delete item.children;
    res.push(item);
  }

  return res;
}

/**
 * @param {Array} tree
 * @returns {Array}
 */
export function treeFilter(tree, func) {
  return tree
    .map(node => ({ ...node }))
    .filter(node => {
      if (node.children) {
        node.children = treeFilter(node.children, func);
      }

      return func(node);
    });
}

export function generateTreeMap(tree, key, deep = new Map()) {
  if (!key) {
    console.warn("key is Must");
    return deep;
  }
  tree.forEach(item => {
    item.children && generateTreeMap(item.children, key, deep); // 遍历子树
    if (!item.children) {
      deep.set(item[key], item);
    }
  });
  return deep;
}
