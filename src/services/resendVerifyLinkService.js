import http from '../services/httpService';
import {apiUrl} from '../config.json';
const apiEndpoint = apiUrl + '/users/resendVerificationLink';

export function resendVerifyLink (user) {
  return http.get (apiEndpoint, {
    params: {
      userName: user.userName,
    },
  });
}
