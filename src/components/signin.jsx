import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/silo-cropped-logo.png";
import logoBlue from "../images/silo-logo-blue.png";
import axios from "axios";
import Joi from "joi";
import * as authService from "../services/authService";
import Footer from './footer';
import Form from './common/form';
import RedButton from './common/centerRedButton';
class SigIn extends Form {
  state = {
    data: {
      userName: "",
      password: "",
      isVerified: true
    },
    errors: {}
  }
  schema = {
    userName: Joi.string().required().messages({
      'string.empty': "Username is required"
    }),
    password: Joi.string()
      .required()
      .messages({
        'string.empty': "Password is required"
      }),
  }

  // handleChange = async (e) => {
  //   let user = { ...this.state.data };
  //   user[e.target.name] = e.target.value;
  //   this.setState({ data: user });
  // }


  doSubmit = async (e) => {
    e.preventDefault();
    let errors = {}
    let result = {}
    try {
      const { data } = this.state;
      await authService.login(data.userName, data.password);

      window.location = "/dashboard";
    } catch (e) {
      console.log("message");
      console.log(e.message);
      result = e.response;
      if (result.status === 400) {
      // window.location = "/signin";
      
      }
      if (result.data.error) {
        let errorDetail = result.data.errorDetail;
        console.log("isverified");
        console.log(errorDetail.isVerified);
        if (!errorDetail.isVerified) {
          console.log("inside is Verified");
          let data = {
            isVerified: false
          }
          this.setState({ data });
        }
        for (let key in errorDetail) {
          errors[key] = errorDetail[key];
        }
        this.setState({ errors })
        return errors
      }
      if (result.status !== 200) {
        result = result.data;
        for (let key in result) {
          errors[result[key].path[0]] = result[key].message;
        }
        this.setState({ errors });
        return errors
      }
    };
  }

  render() {
    const { isVerified } = this.state.data;

    return (
      <React.Fragment>

        <section className="bg-dark-blue no-dashboard d-flex align-items-center">
          <div className="container ">
            <div className="row">

              <div className="col-md-5 mx-auto">
                <img className="form-logo mx-auto d-block" src={logoBlue} alt="silo app" />
                <form className="py-5 form" onSubmit={this.handleSubmit}>
                  {this.renderInput("userName", "Username", "text")}
                  <div className="text-right">
                    {!isVerified &&
                      <Link className="d-block pb-4" to="/resend-verification-link">
                        Resend verification link.
                       </Link>}
                  </div>
                  {this.renderInput("password", "Password", "password")}
                  {this.renderButton("Sign in", "submit")}


                  <div className="text-center mb-4">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
                  <RedButton text={"Create an account"} href={"/signup"} />
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default SigIn;
