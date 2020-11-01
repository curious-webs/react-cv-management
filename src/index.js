import 'font-awesome/css/font-awesome.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import store from './store/index';
import {Provider} from 'react-redux';
import {updateStoreProfileImg} from './store/index';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
console.log ('here goes store in index.js file');
// console.log (store);
console.log (updateStoreProfileImg);
// store.dispatch ({
//   type: 'updateStoreProfileImg',
//   payload: {
//     profileImg: 'updated profileImg using dispatch',
//   },
// });
// store.dispatch (
//   updateStoreProfileImg ({
//     profileImg: 'updated profileImg using dispatch',
//   })
// );

store.dispatch ({
  type: 'apiCall',
  payload: {
    url: '/posts',
    method: 'GET',
    onSucess: 'addPost',
    onError: 'apiCallFailed',
  },
});

ReactDOM.render (
  <React.StrictMode>

    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById ('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister ();
