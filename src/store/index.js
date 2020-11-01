import {createSlice, configureStore,getDefaultMiddleware} from '@reduxjs/toolkit';
import api from './middleware/api';
import logger from './middleware/logger';

let slice = createSlice ({
  name: 'userDetail',
  initialState: {
    data: {},
  },
  reducers: {
    updateStoreProfileImg: (state, action) => {
      console.log("inside reducer.. ");
      console.log("called when action is dispatched and now its time to change profileImg value");
      console.log("am hoping getting value of profileImg");
      console.log(action); 
     
     state.data = action.payload.data;
     // return Object.assign({},state.data,action.payload.data)
// return {...state, data : action.payload.data}


      
    },
  },
});
console.log("here goes middleware values");
console.log(slice.actions);
let store = configureStore ({
  reducer: slice.reducer,
  middleware: [
    ...getDefaultMiddleware (),
    // logger ({someObj: '45 param val'}),
    api
   ],
});

export let {updateStoreProfileImg} = slice.actions;
console.log("hmm in store profile img function");
console.log(updateStoreProfileImg); 
export default store;    
