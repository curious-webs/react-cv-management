import React, { Component } from 'react';
import axios from "axios";
import { apiUrl } from "../config.json"
import queryString from 'query-string';
import logoBlue from "../images/silo-logo-blue.png";
import { Link, NavLink } from 'react-router-dom';
import * as resendLink from "../services/verifyEmailService";


class VerifyEmail extends Component {
    state = { }
    componentDidMount = async () => {
        let params = queryString.parse(this.props.location.search)
        if (params.token) {
            let tokens = {
                token: params.token
            }
            try {
                const response = await resendLink.verifyEmail(params);
                let isVerified = response.data.isVerified;
                this.setState({ isVerified: isVerified, isDestroy: false });

            } catch (e) {
                console.log(e.message);
                let isVerified = e.response.data.errorDetail.isVerified;
                this.setState({ isVerified: isVerified, isDestroy: true });
            }
        }
    }

    render() {
        let { isVerified, isDestroy } = this.state;
        return (<React.Fragment>
            <section className="bg-dark-blue no-dashboard d-flex align-items-center">
                <div className="container ">
                    <div className="row">
                        <div className="col-md-5 mx-auto text-center">
                            <img className="form-logo mx-auto d-block" src={logoBlue} alt="silo app" />
                            {(isVerified && !isDestroy) &&
                                <p className="text-white my-3">Email verified successfully. You can
                                    <a className="d-inline-block px-1" href="http://localhost:3001/signin">
                                        Signin
                                    </a>now to your account</p>
                            }
                            {isVerified && isDestroy &&
                                <p className="text-white my-3">Email verified successfully. You can
                               <a className="d-inline-block px-1" href="http://localhost:3001/signin">
                                        Signin
                               </a>now to your account</p>}

                            {(!isVerified && isVerified == undefined) &&
                                <p className="text-white my-3">Link is not valid. Kindly check your email.
                            <a className="d-block py-2 px-1" href="http://localhost:3001/resend-verification-link">
                                        Resent verification link again
                            </a></p>}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>);
    }
}

export default VerifyEmail;