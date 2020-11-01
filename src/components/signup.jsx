import React, { Component } from 'react';
import * as userService from '../services/userService';
import { toast } from 'react-toastify';
import Joi from "joi";
import Footer from './footer';
import logo from "../images/silo-cropped-logo.png";
import logoBlue from "../images/silo-logo-blue.png";
import { Link } from 'react-router-dom';
import Form from "./common/form";
import RedButton from '../components/common/centerRedButton';

class SignUp extends Form {
    state = {
        data: {
            userName: "",
            email: "",
            password: ""
        },
        errors: {},
        showForm: true
    }

    schema = {
        userName: Joi.string()
            .min(4)
            .max(15)
            .trim()
            .regex(/^[_ a-zA-Z0-9]+$/)
            .required()
            .label("User Name")
            .messages({
                'string.pattern.base': 'Username must contain only alphanumeric and _',
                'string.min': 'Username must be atleast 4 characters long',
                'string.max': 'Username cannot be more than 15 characters',
                'string.empty': "Username is required"
            }),
        email: Joi.string().email({ tlds: { allow: false } }).messages({
            'string.empty': "Email is required"
        }),
        password: Joi.string()
            .min(6)
            .trim()
            .regex(/^(?=.*[!@#\$%\^&\*])(?=.{6,})/)
            .required()
            .messages({
                'string.pattern.base': 'must have length 6 and one special character',
                'string.empty': "Password is required"
            }),
    };

    doSubmit = async (e) => {
        e.preventDefault();
        let errors = {}
        try {
            await userService.register(this.state.data);
            toast.success('Account created successfully!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState({ showForm: false });

        } catch (ex) {

            let result = ex.response;
            if (result) {
                if (result.data.error) {
                    let errorDetail = result.data.errorDetail;
                    for (let key in errorDetail) {
                        errors[key] = errorDetail[key];
                    }

                    this.setState({ errors })
                    return errors
                }
// console.log("Here goes result");
// console.log(result);  
                if (result.status !== 200) {
                    result = result.data;
                    for (let key in result) {
                        errors[result[key].path[0]] = result[key].message;
                    }
                    this.setState({ errors });
                    return errors
                }
            } else {
                toast.error('Something went wrong!! Please try again.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

        };

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
                                {this.renderInput("userName", "Username", "text")}
                                {this.renderInput("email", "Email", "email", "true")}
                                {this.renderInput("password", "Password", "password")}
                                {this.renderButton("Sign up", "submit")}
                                <p className="text-white text-center">Already have acount?</p>
                                <RedButton text={"Login Now"} href={"/signin"} />
                            </form>}
                            {!showForm &&
                                <React.Fragment>
                                    <p className="text-white my-3 text-center">
                                        Account created successfully.
                                      Check your email for link   
                                        </p>
                                        {/* <RedButton text={"Login Now"} href={"/signin"} /> */}
                                </React.Fragment>}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </React.Fragment>);
    }
}

export default SignUp;