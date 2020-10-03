import http from '../services/httpService';
import {apiUrl} from '../config.json';
const apiEndpoint = apiUrl + '/users/signup';

export function register (user) {
  return http.post (apiEndpoint, {
    userName: user.userName,
    email: user.email,
    password: user.password,
  });
}
