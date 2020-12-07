import React, {Component} from 'react';
import jwtDecode from 'jwt-decode';
import {Router, Route, Redirect, Switch} from 'react-router-dom';
import SigIn from './components/signin';
import SignUp from './components/signup';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/dashboard';
import * as auth from './services/authService';
import {connect} from 'react-redux';
import NavBar from './components/navigation';
import VerifyEmail from './components/verify-email';
import ForgotPassword from './components/forgot-password';
import ResetPassword from './components/reset-password';
import ResendVerificationLink from './components/resendVerificationLink';
import ProfileDashboard from './components/profile-dashboard';
import Cvs from './components/cvs';
import EditProfile from './components/edit-profile';
import {updateProfileImg} from './services/profileImgService';
import {withRouter} from 'react-router-dom';
import {userInfo} from './services/userInfoService';
import ChangePassword from './components/change-password';
import Input from './components/common/Input';
import Form from './components/common/form';
import {handleChange} from './components/common/form';
import UserContext from './context/userContext';
import {updateStoreProfileImg} from './store/index';
import MyTest from './components/mytest';


class App extends Component {
  state = {
    data: {},
    errors: {},
  };

  componentDidMount = async () => {
    // let user = await userInfo (auth.getUser ());
    // this.setState ({user: user.data});
    // this.setState ({data: user.data});
  };

  ComponentDidUpdate = async prevProps => {
    // console.log (
    //   'app.js app.js  app.js  app.js  app.js  app.js Component did mount'
    // );
    let user = await userInfo (auth.getUser ());
    this.setState ({user: user.data});
  };

  handleAppChange = async ({currentTarget: input}) => {};

  handleProfileImage = async ({currentTarget: input}) => {
    console.log ('Working in profile Image function of app.js');

    let user = {...this.state.user};
    user['profileImg'] = input.files[0];
    this.setState ({user});
  };

  render () {
    const {user} = this.state;
    console.log ('inside app file rendering app.js state');
    console.log (user);
    console.log ('inside app file rendering user in  app.js state');
    console.log (this.state.user);

    console.log ('here goes data value of state');
    console.log (this.props);
    let userFromStore = this.props.data;
    return (
      <React.Fragment>
        <ToastContainer />
        {auth.isLogin () && <NavBar user={userFromStore} />}
        <Switch>
          {auth.isLogin () &&
            <React.Fragment>
               
              <Route path="/dashboard" component={Dashboard} />
              {/* <UserContext.Provider value={this.state.data}> */}
              <Route path="/mytest" component={MyTest}/>
              <Route
                path="/editprofile"
                render={props => <EditProfile {...props} />}
              />
               <Route path="/mycv" component={Cvs} />
              <Route
                path="/profile"
                render={props => (
                  <ProfileDashboard
                    formComponent={<Form />}
                    user={userFromStore}
                    onFileAppChange={this.handleProfileImage}
                  />
                )}
              />
              {/* </UserContext.Provider> */}

              <Route
                path="/change-password"
                render={props => <ChangePassword user={user} />}
              />
              <Redirect from="/forgot-password" exact to="/dashboard" />
              <Redirect
                from="/resend-verification-link"
                exact
                to="/dashboard"
              />
              <Redirect from="/reset-password" exact to="/dashboard" />
              <Redirect from="/signup" exact to="/dashboard" />
              <Redirect from="/signin" exact to="/dashboard" />
              <Redirect from="/verify-email" exact to="/dashboard" />
              <Redirect from="/verify-email/:token" exact to="/dashboard" />

            </React.Fragment>}
          {!auth.isLogin () &&
            <React.Fragment>
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route
                path="/resend-verification-link"
                component={ResendVerificationLink}
              />
              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SigIn} />
              <Route path="/verify-email" component={VerifyEmail} />
              <Route path="/verify-email/:token" component={VerifyEmail} />
            </React.Fragment>}

          <Redirect from="/" exact to="/signin" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}
let mapStateToProps = state => {
  console.log (
    'inside mapStateToProps state is from redux I guess  it is coming'
  );
  console.log (state);
  return {
    data: state.data,
    user: state.data,
  };
};
export default withRouter (connect (mapStateToProps) (App));
// export default App;
