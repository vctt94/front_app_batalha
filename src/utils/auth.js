import Router from 'vue-router';

const TOKEN = 'puffpass-token'
const USER_ID = 'user-id'

const router = new Router({
  mode: 'history',
});

export function login(scope, token, id, redirect) {
  setToken(token)
  setUserId(id)
  if (redirect) {
    router.push(redirect)
    router.go(redirect)
  }
}

export function logout(redirect) {
  clearToken();
  clearUserId();
  if (redirect) {
    router.push(redirect)
    router.go(redirect)
  }
}

export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function disconnectUser(){
  clearToken()
  clearUserId()
}

function clearToken() {
  localStorage.removeItem(TOKEN);
}

export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

export function setUserId(id) {
  localStorage.setItem(USER_ID, id);
}

export function getUserId() {
  return localStorage.getItem(USER_ID);
}
function clearUserId() {
  localStorage.removeItem(USER_ID);
}

export function isLoggedIn() {
  return !!getToken() && !!getUserId()

}

function getTokenExpirationDate(encodedToken) {

}

function isTokenExpired(token) {

}
