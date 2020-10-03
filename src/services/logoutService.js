import http from './httpService';
import {apiUrl} from '../config.json';
const apiEndpoint = apiUrl + '/users/logout';

export function logout (token) {
    console.log("inside logout token is");
    console.log(token);
  return http.get (
    apiEndpoint,
    {
      headers: {
        'x-auth-token': token
      },
    }
  );
}
