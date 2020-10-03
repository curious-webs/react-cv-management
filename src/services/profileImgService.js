import http from '../services/httpService';
import {apiUrl} from '../config.json';
import * as auth from '../services/authService';
const apiEndpoint = apiUrl + '/users/profile/image';

export function updateProfileImg (formData) {
  console.log("FormData Goes here");
  console.log(formData);
  return http.put (
    apiEndpoint,
    formData,
    {
      headers: {
        'x-auth-token': auth.getJwt (),
        "Content-Type": "multipart/form-data"
      },
    }
  );
}
