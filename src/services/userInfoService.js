import http from '../services/httpService';
import {apiUrl} from '../config.json';
const apiEndpoint = apiUrl + '/users/profile';

export function userInfo (user) {
  return http.get (apiEndpoint, {
    params: {id: user._id},
  });
}
