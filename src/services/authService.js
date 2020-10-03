import http from '../services/httpService';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {apiUrl} from '../config.json';
const apiEndpoint = apiUrl + '/users/signin';
const tokenKey = 'token';
export async function login (userName, password) {
  const response = await axios.post (apiEndpoint, {
    userName: userName,
    password: password,
  });
  let jwt = response.headers['x-auth-token'];
  localStorage.setItem (tokenKey, jwt);
}
export function logout () {
  localStorage.removeItem (tokenKey);
}
export function loginWithJwt (jwt) {
  localStorage.setItem (tokenKey, jwt);
}
export function getJwt () {
  return localStorage.getItem (tokenKey);
}
export function isLogin () {
  let user = {};
  let token = localStorage.getItem (tokenKey);
  if (token) {
    user = jwtDecode (token);
  }
  return user.isVerified ? true : false;
}
export function removeJwt () {
  return localStorage.removeItem (tokenKey);
}
export function getUser () {
  let user = {};
  let token = localStorage.getItem (tokenKey);
  if (token) {
    user = jwtDecode (token);
  }
  return user ? user : null;
}
export function setJwt (jwt) {
  return localStorage.setItem (tokenKey, jwt);
}
