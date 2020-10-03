import React, { Component } from 'react';

import Joi from "joi";
import logoBlue from "../images/silo-logo-blue.png";
import Form from './common/form';
import * as  resendVerifyLinkService from "../services/resendVerifyLinkService";
import { toast } from 'react-toastify';
class ResendVerificationLink extends Form {
    state = {
        data: {
            userName: ""
        },
        showForm: true,
        errors: ""
    }
    schema = {
        userName: Joi.string().required().messages({
            'string.empty': "Username is required"
        }),

    }
    doSubmit = async (e) => {
        e.preventDefault();

        try {
            let response = await resendVerifyLinkService.resendVerifyLink(this.state.data);
            toast.success("Verification link has been sent. Kindly check your email.");
            this.setState({ showForm: false });
        } catch (e) {
            let errors = { ...this.state.data };
            errors["userName"] = e.response.data.message;
            this.setState({ errors });
        }
    }
    render() {
        let { showForm } = this.state;
        return (<React.Fragment>
            <section className="bg-dark-blue no-dashboard d-flex align-items-center">
                <div className="container ">
                    <div className="row">

                        <div className="col-md-5 mx-auto">
                            <img className="form-logo mx-auto d-block" src={logoBlue} alt="silo app" />
                            {showForm && <form className="py-5 form" onSubmit={this.handleSubmit}>
                                {this.renderInput("userName", "Username or Email", "text")}
                                {this.renderButton("Resend Verification Link", "submit")}
                            </form>}
                            {!showForm &&
                                <p className="text-white my-3 text-center">
                                    Verification link has been sent to your email.
                                    Kindly check your inbox.
                                        </p>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment >);
    }
}

export default ResendVerificationLink;