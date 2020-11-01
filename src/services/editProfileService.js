import http from '../services/httpService';
import {apiUrl} from '../config.json';
import * as auth from '../services/authService';

const apiEndpoint = apiUrl + '/users/profile/edit';

export function editProfile (user) {
  console.log ('in editProfile function checking user object values');
  console.log (user);
  return http.put (
    apiEndpoint,
    {
      // firstName: user.firstName,
      // middleName: user.middleName,
      // lastName: user.lastName,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      phone: user.phone,
      address: {
        address_name: user.address_name,
        address_line_1: user.address_line_1,
        address_line_2: user.address_line_2,
        city: user.city,
        state: user.regions,
        landmark: user.landmark,
        country_code: user.country_code,
        zip_code: user.zip_code,
        address_type: user.address_type,
        address_tag: user.address_tag,
        phone: {
          primary: user.phone,
        },
      },
    },
    {
      headers: {
        'x-auth-token': auth.getJwt (),
      },
    }
  );
}
