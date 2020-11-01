import axios from 'axios';
import * as auth from "../../services/authService";
import {apiUrl} from '../../config.json';
import { userInfo } from '../../services/userInfoService';
import {updateStoreProfileImg} from '../index';

const apiEndpoint = apiUrl + '/users/profile';

let api = store => next => async action => {
  console.log ('api middleware called with action type');
  console.log(action.type);    
  if (action.type != 'apiCall' || action.type == undefined) {
      console.log("inside undefined or apiCall")
     
    return next (action);
  }
  
  if(action.type == 'apiCall'){
    next (action);
    const {url, method, data, onSucess, onError} = action.payload;
    try {
      let user = auth.getUser ();
      let response = await userInfo (user);
      console.log ('current state');
      console.log (store.getState ());
      //store.dispatch ({type:"addPost",payload:{id:3,title:"Please chal jaa function cho pass kitta"}});
      console.log (response.data);    
      store.dispatch (
        updateStoreProfileImg ({data: response.data})
      ); 
    } catch (e) {
      console.log ('inside catch');
      // store.dispatch ({type: onError, payload: {error:true}});
    }
  }
  
};

export default api;
