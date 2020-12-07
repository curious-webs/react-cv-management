import http from '../services/httpService';
import {apiUrl} from '../config.json';
import * as auth from '../services/authService';

const apiEndpoint = apiUrl + '/cv';

export function deleteCV (cvId) {
  console.log ('in delete CV Service');
  console.log (cvId);
  console.log (auth.getJwt ());
  return http.delete (apiEndpoint, {
    headers: {
      'x-auth-token': auth.getJwt (),
       'cvId' : cvId
    }
  });
}
