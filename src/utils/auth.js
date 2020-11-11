import Cookies from "js-cookie";

const TokenKey = "token";
const userKey = "uId";
const CookieKey = "cId";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getUserId() {
  return Cookies.get(userKey);
}

export function setUserId(id) {
  return Cookies.set(userKey, id);
}

export function removeTUserId() {
  return Cookies.remove(userKey);
}

export function getCookieId() {
  return Cookies.get(CookieKey);
}

export function setCookieId(id) {
  return Cookies.set(CookieKey, id);
}

export function removeCookieId() {
  return Cookies.remove(TokenKey);
}
