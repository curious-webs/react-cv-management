import http from '../services/httpService';
import {apiUrl} from '../config.json';
import {getJwt} from '../services/authService';
const apiEndpoint = apiUrl + '/users/reset-password';

export function resetPassword (user, params) {
  console.log ('reset function');
  console.log (user);
  console.log("here goes token");
  console.log(getJwt());
  return http.put (apiEndpoint, user, {
    headers: {
      'x-auth-token': getJwt (),
    },
  });
}
