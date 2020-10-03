import http from '../services/httpService';
import {apiUrl} from '../config.json';
const apiEndpoint = apiUrl + '/users/verify';

export function verifyLink (params) {
    console.log("verify function");
   
  return http.put (apiEndpoint, {}, {
    headers: { 
      'x-auth-token': params.token,
    },
  });
}
