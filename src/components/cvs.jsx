import React, { Component, userState } from 'react';
import Parser from 'html-react-parser';
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md';
import { GrFormView } from 'react-icons/gr';
import { connect } from 'react-redux';
import CvAdd from './cv-add';
import { deleteCV } from './../services/deleteCVService';
import Form from './common/form';
import store from '../store/index';  
class Cvs extends Form {
    state = {
        isAddCv: false,

    }
    handleAddCvClick = () => {
        this.setState({ isAddCv: true });
    }
    handleBack = () => {
        this.setState({ isAddCv: false });
    }
    async handleDeleteChange(e) {
        let cvId = e.currentTarget.value;
        console.log(cvId);
        let cvss = await deleteCV(cvId);
        console.log(cvss); 
        store.dispatch({
            type: 'apiCall',
            payload: {
                url: '/posts',
                method: 'GET',
                onSucess: 'addPost',
                onError: 'apiCallFailed',
            },
        }); 
    }
    render() {
        console.log("here goes state in cvs");
        console.log(this.state);
        console.log("here goes props in cvs");
        console.log(this.props);
        let { isAddCv, data } = this.state;
        let cvs = this.props.data.cv;
        return (<React.Fragment>
            <div id="main-content" className="pt-5 bg-body-color fullheight">
                <div className="profile-settings-wrap cv-settings-wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 bg-white">
                                {!isAddCv &&
                                    <React.Fragment>
                                        <div className="mt-3">
                                            <button
                                                onClick={this.handleAddCvClick}
                                                className="bg-green btn text-white btn-md ml-auto">
                                                Add CV
                                             </button>
                                        </div>

                                        <table id="example" className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Job Name</th>
                                                    <th>Cover Letter</th>
                                                    <th>CV/Resume</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cvs.map(cv => {
                                                        return (
                                                            <tr>
                                                                <td>{cv.jobName}</td>
                                                                <td>{Parser(cv.coverLetterText)}</td>
                                                                <td>Edinburgh</td>
                                                                <td>
                                                                    <button>
                                                                        <GrFormView />
                                                                    </button>
                                                                    <button>
                                                                        <FiEdit />
                                                                    </button>
                                                                    <button value={cv._id} data-cv={cv._id} onClick={this.handleDeleteChange}>
                                                                        <MdDelete />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }



                                            </tbody>

                                        </table>

                                    </React.Fragment>
                                }
                                {isAddCv &&
                                    <CvAdd
                                        onBack={this.handleBack}
                                        onSubmit={this.handleSubmit}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>);
    }
}


let mapStateToProps = state => {

    return {
        data: state.data
    };
};
export default connect(mapStateToProps)(Cvs);
