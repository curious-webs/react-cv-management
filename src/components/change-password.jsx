import Joi from 'joi';
import React, { Component } from 'react';
import Form from './common/form';
import { sidebar } from './common/sidebar';
import { resetPassword } from './../services/resetPasswordService';
import { removeJwt } from '../services/authService';
import { toast } from 'react-toastify';

class ChangePassword extends Form {
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
            }),
    }

    doSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await resetPassword(this.state.data);
            console.log("here goes response");
            console.log(response);
            toast.success("Password Changed Successfully!!");
            removeJwt();
            window.location.href = "/";
        } catch (ex) {
            console.log("something failed");
            console.log(ex);
            console.log(ex.messages);
            console.log(ex.response);
            let result = ex.response;
            let errors = { ...this.state.error };
            if (result) {
                if (result.data.error) {
                    let errorDetail = result.data.errorDetail;
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
            }


        }
    }
    render() {
        return (<React.Fragment>
            <div className="pt-5 mt-5">
                <div className="pt-5 pb-5">
                    <div className="profile-settings-wrap bg-dark-blue">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    {sidebar()}
                                </div>
                                <div className="col-md-8">
                                    <div class="card">
                                        <div class="card-body p-0">
                                            <div className="as-header card-header text-muted">
                                                <span className="h6 as-title">Change Password</span>
                                            </div>
                                            <form className="form" onSubmit={this.handleSubmit}>

                                                <div className="d-flex align-items-start as-body">

                                                    <div className="profile-info as-fields-wrap w-100">
                                                        <ul className="pl-0 w-100 d-flex align-items-center">
                                                            <li className="d-flex w-55">
                                                                {this.renderInput("password", "New Password", "text", "transparent")}
                                                            </li>
                                                            <li className="d-flex w-55">
                                                                {this.renderInput("confirmPassword", "Confirm Pasword", "text", "transparent")}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="as-footer d-flex card-footer text-muted">
                                                    {this.renderButton("Change Password", "submit", "bg-green btn-md text-white ml-auto", false)}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>);
    }
}

export default ChangePassword;