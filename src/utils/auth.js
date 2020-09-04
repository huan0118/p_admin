import Cookies from "js-cookie";

const TokenKey = "token";
const userkey = "userid";
const CookieKey = "Cid";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getUserid() {
  return Cookies.get(userkey);
}

export function setUserid(id) {
  return Cookies.set(userkey, id);
}

export function removeTUserid() {
  return Cookies.remove(userkey);
}

export function getCookieid() {
  return Cookies.get(CookieKey);
}

export function setCookieid(id) {
  return Cookies.set(CookieKey, id);
}

export function removeCookieid() {
  return Cookies.remove(TokenKey);
}
