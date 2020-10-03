import http from '../services/httpService';
import {apiUrl} from '../config.json';
let apiEndpoint = apiUrl + '/users/verifyEmail';
export  function verifyEmail (params) {
  return http.put (
    apiEndpoint,
    {},
    {
      headers: {
        'x-auth-token': params.token,
      },
    }
  );
}
