import userEvent from '@testing-library/user-event';
import React, { Component,useContext } from 'react';
import { Link } from 'react-router-dom';
import Form from './common/form';
import { sidebar } from './common/sidebar';
import NavBar from './navigation';
import { ImUser } from 'react-icons/im';
import { MdEmail, MdLocalPhone, MdCake } from 'react-icons/md';
import { FaFemale, FaMale } from 'react-icons/fa';
import userIconImg from '../images/user-icon.jpg';
import * as auth from "../services/authService";
import { userInfo } from '../services/userInfoService';
import Moment from 'moment';
import EditProfile from './edit-profile';
import { editProfile } from '../services/editProfileService';
import Joi from 'joi';
import cNumber from 'joi-phone-number';
import { toast } from 'react-toastify';
import { withRouter } from "react-router-dom";
import { updateProfileImg } from './../services/profileImgService';
import UserContext from './../context/userContext';
const myJoi = Joi.extend(cNumber);
class ProfileDashboard extends Form {
    state = {
        data: {},
        isButtonClicked: false,
        errors: {}
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
        email: myJoi.string().email({ tlds: { allow: false } }).messages({
            'string.empty': "Email is required"
        }),
        phone: myJoi.string().phoneNumber({ defaultCountry: 'US', format: 'international' }),
        gender: myJoi.string().valid('female', 'male', 'others', 'prefer_not_to_say')

    }
    handlebtnClick = () => {
        this.setState({ isButtonClicked: true });
    }
    handleBack = () => {
        console.log("handleBack called");
        this.setState({ isButtonClicked: false });
    }

    componentDidMount = async () => {
        console.log("hey am in mount ");
        console.log(this.props);
        this.setState({ data: this.props.user });
    }

    doSubmit = async (e) => {
    
        console.log("do submit called")
        e.preventDefault();
        console.log(this.state.data);
        let data = { ...this.state.data };
        try {
            console.log("inside try vlovk");
            let result = await editProfile(this.state.data);
// console.log("hmm here we are after submitting lets update whole state of app.js")
// console.log(userContext);

            console.log("here goes result");
            console.log(result);
           this.setState({ data });
            toast.success("Profile Updated Successfully!!");
        } catch (e) {
            console.log("inside you catch block are");
            console.log(e.message);
            console.log(e.response);
            console.log("cache block ends");
        }

    }
    render() {
        console.log("Here in profile dashboard renderig props");
        console.log(this.props);
        console.log("checking form component");
        console.log(this.props);
        let user = this.state.data;
        let formattedBirthDate = "";
        if (user.dateOfBirth) {
            formattedBirthDate = Moment(user.dateOfBirth).format("LL");
        }
        let { isButtonClicked } = this.state;
        return (<React.Fragment>
            <div id="main-content" className="pt-5 bg-body-color fullheight">
                <div className="profile-settings-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                {sidebar()}
                            </div>
                            {!isButtonClicked &&
                                <div className="col-md-8">
                                    <div class="card">
                                        <div class="card-body p-0">
                                            <div className="as-header card-header text-muted">
                                                <ImUser />
                                                <span className="h6 as-title">Profile Information</span>
                                            </div>
                                            <div className="d-flex align-items-center as-body">
                                               
                                                <div className="profile-info as-fields-wrap">
                                                    <ul className="d-flex align-items-center">
                                                        <li className="d-flex align-items-center  w-50 pr-2">
                                                            <ImUser />
                                                            <span className="as-text">
                                                                {user.userName}
                                                            </span>
                                                        </li>
                                                        <li className="d-flex align-items-center  w-50 pl-2">
                                                            <MdEmail />
                                                            <span className="as-text">
                                                                {user.email}
                                                            </span>
                                                        </li>
                                                        {user.phone &&
                                                            <li className="d-flex align-items-center  w-50 pr-2">
                                                                <MdLocalPhone />
                                                                <span className="as-text">
                                                                    {user.phone}
                                                                </span>
                                                            </li>}
                                                        {!user.phone &&
                                                            <li className="d-flex align-items-center  w-50 pr-2">
                                                                <MdLocalPhone />
                                                                <span className="as-text">
                                                                    Not Provided
                                                                </span>
                                                            </li>}
                                                        {user.dateOfBirth &&
                                                            <li className="d-flex align-items-center  w-50 pl-2">
                                                                <MdCake />
                                                                <span className="as-text">
                                                                    {formattedBirthDate}
                                                                </span>
                                                            </li>}
                                                        {!user.dateOfBirth &&
                                                            <li className="d-flex align-items-center  w-50 pl-2">
                                                                <MdCake />
                                                                <span className="as-text">
                                                                    Not Provided
                                                                </span>
                                                            </li>}
                                                        {user.gender &&
                                                            <li className="d-flex align-items-center  w-50 pr-2">
                                                                <FaFemale />
                                                                {/* <FaMale /> */}
                                                                <span className="as-text">
                                                                    {user.gender}
                                                                </span>
                                                            </li>}
                                                        {!user.gender &&
                                                            <li className="d-flex align-items-center  w-50 pl-2">
                                                                <FaFemale />
                                                                {/* <FaMale /> */}
                                                                <span className="as-text">
                                                                    Not Provided
                                                                </span>
                                                            </li>}

                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="card-footer text-muted">

                                                <button className="bg-green btn text-white btn-md ml-auto" onClick={this.handlebtnClick}>
                                                    Edit Profile
                                                 </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                isButtonClicked &&
                                <EditProfile
                                    onGoBack={this.handleBack}
                                    onFileChange={this.handleFileChange}
                                    onDateChange={this.handleDateChange}
                                    onValChange={this.handleChange}
                                    fieldValues={this.state}
                                    onFormSubmit={this.handleSubmit} />
                            }

                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>);
    }
}

export default ProfileDashboard;