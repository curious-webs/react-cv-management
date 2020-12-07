import React, { Component } from 'react';
import Form from './common/form';
import { IoMdDocument } from 'react-icons/io';
import JoditEditor from "jodit-react";
import Joi from 'joi';
import store from '../store/index';
import {addEditCV } from './../services/addEditCVService';
class CvAdd extends Form {  
    state = {
        data: {
            jobName: "",
            coverLetterText: ""
        }, 
        errors: {

        }
    }
    schema = {
        jobName: Joi.string()
    }

    doSubmit = async (e) => {
        console.log("do submit called cv-add")
        e.preventDefault();
        console.log(this.state.data);
        try {

            let result = await addEditCV(this.state);
            console.log("here goes result");
            console.log(result);   
            store.dispatch({
                type: 'apiCall',
                payload: {
                    url: '/posts',
                    method: 'GET',
                    onSucess: 'addPost',
                    onError: 'apiCallFailed',
                },
            });
        } catch (e) {
            console.log(e.message);
            console.log(e.response);
        }

    }

    render() {
        return (<React.Fragment>
            <div className="w-100">

                <div class="card">
                    <div class="card-body p-0">
                        <div className="as-header card-header text-muted">
                            <IoMdDocument />
                            <span className="h6 as-title">CV Details</span>
                        </div>
                    </div>
                </div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="d-flex align-items-center as-body">

                        <div className="profile-info as-fields-wrap w-100">
                            <ul className="d-flex align-items-center">
                                <li className="d-flex w-100">
                                    {this.renderInput("jobName", "Job Name", "text", "transparent")}
                                </li>
                                <li className="d-flex w-100  mb-3">
                                    {this.renderEditorButton("coverLetterText", "")}
                                </li>
                                <li className="d-flex w-50">
                                    {this.renderPDFDocButton("cvFile")}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="as-footer d-flex card-footer text-muted">
                        {this.renderButton("Back", "button", "bg-grey btn-md text-white mr-auto", this.props.onBack)}
                        {this.renderButton("Add CV", "submit", "bg-green btn-md text-white ml-auto", false)}
                    </div>
                </form>
            </div>

        </React.Fragment>);
    }
}

export default CvAdd;