import React, { Component } from 'react';
import { apiUrl } from "../config.json";
import axios from "axios";
import Joi from "joi";
import Form from './common/form';
import { forgotPassword } from './../services/forgotPasswordService';
import { toast } from 'react-toastify';
import logoBlue from "../images/silo-logo-blue.png";
class ForgotPassword extends Form {
    state = {
        data: {
            userName: "",
        },
        showForm: true,
        errors: ""
    }
    schema = {
        userName: Joi.string().required().messages({
            'string.empty': "Username or email is required"
        })
    }
    doSubmit = async (e) => {
        e.preventDefault();

        try {
            let response = await forgotPassword(this.state.data);
            // console.log(response);
            // let errors = { ...this.state.data };
            // errors["userName"] = response.data.message;
            // this.setState({ errors });
            toast.success("Password resent link sent");
            this.setState({ showForm: false });
        } catch (e) {
            console.log("inside catch ");
            console.log(e);
            toast.error("Something went wrong!!");
            let errors = { ...this.state.data };
            errors["userName"] = e.response.data.message;
            this.setState({ errors });
        }
    }
    render() {
        const { showForm } = this.state;
        return (<React.Fragment>
            <section className="bg-dark-blue no-dashboard d-flex align-items-center">
                <div className="container ">
                    <div className="row">
                        <div className="col-md-5 mx-auto">
                            <img className="form-logo mx-auto d-block" src={logoBlue} alt="silo app" />
                            {showForm && <form className="py-5 form" onSubmit={this.handleSubmit}>
                                {this.renderInput("userName", "Username", "text")}
                                {this.renderButton("Forgot Password", "submit")}
                            </form>}
                            {!showForm && <p className="text-white my-3 text-center">
                                Password reset link has been sent to your email.
                                Kindly check your inbox.
                                        </p>}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment >);
    }
}

export default ForgotPassword;