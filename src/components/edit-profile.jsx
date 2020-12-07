import userEvent from '@testing-library/user-event';
import React, { Component, userState } from 'react';
import { Link } from 'react-router-dom';
import Form from './common/form';
import { sidebar } from './common/sidebar';
import NavBar from './navigation';
import { ImUser } from 'react-icons/im';
import { MdEmail, MdLocalPhone, MdCake } from 'react-icons/md';
import { FaFemale, FaMale } from 'react-icons/fa';
import userIconImg from '../images/user-icon.jpg';
import { userInfo } from '../services/userInfoService';
import { editProfile } from '../services/editProfileService';
import * as auth from "../services/authService";
import Joi from 'joi';
import cNumber from 'joi-phone-number';
import UserContext from './../context/userContext';
const myJoi = Joi.extend(cNumber);
class EditProfile extends Form {

    // state = {
    //     data: {

    //     },
    //     errors: {}
    // }
    constructor(props) {
        super(props);
        //   console.log("here goes props");
        //   console.log(props.fieldValues);
        //   this.setState({data:props.fieldValues});
        //   console.log("here checking state");
        //   console.log(this.state); 
    }
    // static contextType = UserContext;
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
    componentDidMount = async () => {
        console.log("hey am mounting in edit profile hope so");
        // console.log(this.context);
        // try {
        //     let user = auth.getUser();
        //     let profile = await userInfo(user);
        //     this.setState({ data: profile.data });
        // } catch (e) {
        //     console.log("response");
        //     console.log(e);
        //     console.log(e.message);
        //     console.log(e.response);
        // }
    }
    doSubmit = async (e) => {
        console.log("do submit called")
        e.preventDefault();
        console.log(this.state.date);
        try {
            let result = await editProfile(this.props.fieldValues);
            console.log("here goes result");
            console.log(result);
        } catch (e) {
            console.log(e.message);
            console.log(e.response);
        }

     }
    componentDidUpdate = () => {
        console.log("Component Updated and rendering props value of store");
       // console.log("also rendering state");
        //console.log(this.state);
        console.log(this.props);
    }
    render() {

        console.log(this.props);
        const today = new Date();
        return (<React.Fragment>


            <div className="col-md-8">
                <div class="card">
                    <div class="card-body p-0">
                        <div className="as-header card-header text-muted">
                            <ImUser />
                            <span className="h6 as-title">Edit</span>
                        </div>
                        <form className="form" onSubmit={this.props.onFormSubmit}>
                            <div className="as-image-wrap">
                                {
                                   !this.props.fieldValues.profileImg &&
                                    this.props.fieldValues.data.hasOwnProperty("profileImg") &&
                                    <img ref="file" className="as-profile-img"
                                        src={this.props.fieldValues.data.profileImg}
                                        alt={this.props.userName} />
                                }
                                {this.props.fieldValues.profileImg &&
                                    <img ref="file"
                                        className="as-profile-img"
                                        src={this.props.fieldValues.profileImg}
                                        alt={this.props.userName} />
                                }

                                {!this.props.fieldValues.data.profileImg &&
                                    <img src={userIconImg} className="as-profile-img" alt="profile" />
                                }
                                {this.renderFileButton("profileImg")}
                            </div>
                            <div className="d-flex align-items-start as-body">
                                <div className="profile-info as-fields-wrap">
                                    <ul className="d-flex align-items-center">
                                        <li className="d-flex w-50 pr-1">
                                            {this.renderInput("userName", "Username", "text", "transparent")}
                                        </li>
                                        <li className="d-flex w-50 pl-1">
                                            {this.renderInput("email", "Email", "email", "transparent")}
                                        </li>
                                        <li className="d-flex w-50 pr-1">
                                            {this.renderInput("phone", "Phone Number", "tel", "transparent")}
                                        </li>
                                        <li className="d-flex w-50 pl-1">
                                            {this.renderDateField("dateOfBirth", "dateOfBirth", today, "Date of Birth", "transparent")}
                                        </li>
                                        <li className="d-flex w-100 radio-btns-wrap">


                                            <div className="input-field-wrap mb-4 transparent">
                                                <span className="input-label radio-label">
                                                    Gender
                                                                     </span>
                                                <div className="radio-btns-inner-wrap">
                                                    <div className="radio-btns-inner-wrap">
                                                        {this.renderRadioButton("gender", "female", "Female", "female")}
                                                        {this.renderRadioButton("gender", "male", "Male", "male")}
                                                        {this.renderRadioButton("gender", "prefer_not_to_say", "Prefer Not to Say", "prefer_not_to_say")}
                                                        {this.renderRadioButton("gender", "others", "Others", "others")}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="as-footer d-flex card-footer text-muted">
                                {this.renderButton("Back", "button", "bg-grey btn-md text-white mr-auto", this.props.onGoBack)}
                                {this.renderButton("Update Profile", "submit", "bg-green btn-md text-white ml-auto", false)}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>);
    }
}

export default EditProfile;