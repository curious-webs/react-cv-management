import React, { Component } from 'react';
import axios from "axios";
import Joi from "joi";
import { apiUrl } from "../config.json"
import queryString from 'query-string';
import { resetPassword } from './../services/resetPasswordService';
import { toast } from 'react-toastify';
import logoBlue from "../images/silo-logo-blue.png";
import Form from './common/form';
import * as auth from './../services/authService';
import jwtDecode from 'jwt-decode';
import { verifyLink } from './../services/verifyLinkService';
import * as resendLink from "../services/verifyEmailService";
class ResetPassword extends Form {
    state = {
        data: {},
        errors: {}
    }
    schema = {
        password: Joi.string()
            .min(6)
            .trim()
            .regex(/^(?=.*[!@#\$%\^&\*])(?=.{6,})/)
            .required()
            .messages({
                'string.pattern.base': 'must have length 6 and one special character',
            }),
        confirmPassword: Joi.string()
            .min(6)
            .trim()
            .regex(/^(?=.*[!@#\$%\^&\*])(?=.{6,})/)
            .required()
            .messages({
                'string.pattern.base': 'must have length 6 and one special character',
            })
    };
    componentDidMount = async () => {
        let params = queryString.parse(this.props.location.search)
        if (params.token) {
            let tokens = {
                token: params.token
            }
            try {
                const response = await resetPassword(this.state.data, params);;
                let isVerified = response.data.isVerified;
                this.setState({ isVerified: isVerified, isDestroy: false });
                if (isVerified) {
                    this.setState({ showForm: true, isReset: true });
                }
            } catch (e) {
                console.log(e.message);
                console.log(e.response);
                let showForm = "";
                let isVerified = e.response.data.errorDetail.isVerified;
                let isDestroy = e.response.data.errorDetail.isTokenDestroyed ? true : false;
                if (!isDestroy) {
                    console.log("inside if");
                    console.log(isDestroy);
                    showForm = true;
                } else {
                    console.log("inside else");
                    showForm = false;
                }
                console.log("setting state");
                console.log(showForm);
                this.setState({ isVerified: isVerified, isDestroy: isDestroy, showForm: showForm });
                console.log(this.state);
                console.log("data set done");
            }
        }
    }
    doSubmit = async (e) => {
        e.preventDefault();
        let params = queryString.parse(this.props.location.search);

        if (params.token) {

            try {
                let response = await resetPassword(this.state.data, params);
                // console.log(response);
                // let errors = { ...this.state.data };
                // errors["userName"] = "updated scesfu";
                // this.setState({ errors });
                toast.success("Password reset successfully.");
                this.setState({ showForm: false });
            } catch (e) {
                console.log("inside catch ");
                console.log(e);

                let result = e.response;
                console.log(result);
                if (result.data.error) {
                    let errors = { ...this.state.user };
                    let errorDetail = result.data.errorDetail;
                    // if (!errorDetail.isVerify) {
                    //     toast.error("Kindly check email for valid link.")
                    // } 
                    for (let key in errorDetail) {
                        errors[key] = errorDetail[key];
                    }

                    this.setState({ errors });
                    return errors
                }
            }
        }
    }
    render() {

        console.log(this.state);
        let { isVerified, isDestroy, showForm, isReset } = this.state;

        // console.log("hey check state data");
        // console.log(this.state.data);
        return (<React.Fragment>
            <section className="bg-dark-blue no-dashboard d-flex align-items-center">
                <div className="container ">
                    <div className="row">
                        <div className="col-md-5 mx-auto">
                            <img className="form-logo mx-auto d-block" src={logoBlue} alt="silo app" />
                            {isReset &&
                                <p className="text-white my-3 text-center">Password reset successfully. Go back to
                                          <a className="d-inline-block px-1" href="http://localhost:3001/signin">
                                        Website
                                    </a></p>
                            }
                            {isVerified && isDestroy &&
                                <p className="text-white my-3 text-center">Link Expired. Go Back to
                               <a className="d-inline-block px-1" href="http://localhost:3001/signin">
                                        Website
                               </a></p>}

                            {(!isVerified && isVerified == undefined) &&
                                <p className="text-white my-3">Link is not valid. Kindly check your email.
                            <a className="d-block py-2 px-1" href="http://localhost:3001/resend-verification-link">
                                        Resent verification link again
                            </a></p>}
                            {showForm &&
                                <form className="py-5 form" onSubmit={this.handleSubmit}>
                                    {this.renderInput("password", "Password", "password")}
                                    {this.renderInput("confirmPassword", "Confirm Password", "password")}

                                    {this.renderButton("Reset Password", "submit")}
                                </form>}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>);
    }
}

export default ResetPassword;