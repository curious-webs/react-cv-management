import http from './httpService';
import {apiUrl} from '../config.json';
import * as auth from './authService';

const apiEndpoint = apiUrl + '/cv/add';

export function addEditCV (user) {
  console.log ('in addEditCV');
  console.log (user);
  return http.put (
    apiEndpoint,
    {
      jobName: user.data.jobName,
      coverLetterText: user.data.coverLetterText,
      cvFile: user.data.cvFile,
    },    
    { 
      headers: {
        'x-auth-token': auth.getJwt (),
      },
    }
  );
}
