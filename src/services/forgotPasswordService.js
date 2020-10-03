import http from './httpService';
import {apiUrl} from '../config.json';
const apiEndpoint = apiUrl + '/users/forgot-password';

export function forgotPassword (user) {
  return http.get (apiEndpoint, {
    params: {userName:user.userName} ,
  });
}
