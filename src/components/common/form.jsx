import React, { Component, useContext } from "react";
import _ from "lodash";
import Joi from "joi";
import Input from '../common/Input';
import DatePicker from "react-datepicker";
import Moment from 'moment';
import myCustomJoi from 'joi-phone-number';
import axios from 'axios';
import UserContext from './../../context/userContext';
import JoditEditor from "jodit-react";
const myJoi = Joi.extend(myCustomJoi);
class Form extends Component {
    state = {
        data: {},
        errors: {}
    }
    validate = (data, schema) => {

        const fieldSchema =
            Joi.object(schema).unknown();
        const result = fieldSchema.validate(data);

        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }
    validateField = (name, value, schema) => {
        const obj = {
            [name]: value
        };
        const fieldSchema = Joi.object({
            [name]: schema[name]
        }).unknown();
        console.log(fieldSchema);
        const result = fieldSchema.validate(obj);
        return result.error ? result.error.message : null;
    }
    validatePhone = (phone) => {
        console.log("inside validate phone function");
        console.log(myJoi);
        //console.log(myCustomJoi.phoneNumber); 
        //   let isValid =  Joi.string().phoneNumber().validate('+32494567324');
        console.log("here goes vaid value");
        //   console.log(isValid);
    }
    validateImg = (img) => {
        console.log("inside validate image");
        console.log(img.name);
        if (!img.name.match(/.(jpg|jpeg|png|gif)$/i)) {
            return false
        } else {
            if (img.size > 500000) {
                return false
            }
            return true
        }
    }
    handleChange = async ({ currentTarget: input }) => {

        const errors = {};

        let errorMessage = this.validateField(input.name, input.value, this.schema);
        if (errors) errors[input.name] = errorMessage;
        else delete errors[input.name];
        let data = { ...this.state.data };
        data[input.name] = input.value;

        console.log("setting data values");
        console.log(data);
        this.setState({ data: data, errors });
        console.log("after setting state");
        console.log(this.state);
    }

    handleFileChange = async ({ currentTarget: input }) => {
        console.log("handle File changed is called");
        console.log(input);
        // var file = input.refs.file.files[0];
        const isImg = this.validateImg(input.files[0]);
        if (isImg) {
            console.log(input.files[0]);
            let url = URL.createObjectURL(input.files[0]);
            console.log("here goes url");
            console.log(url);
            let data = { ...this.state.data };
            data[input.name] = input.files[0];
            this.setState({ data, profileImg: url }, () => {
                console.log("hey am completed and here is my val");
                console.log(this.state);
            });

        } else {
            console.log("not an image lets show error");
        }
    }

    handlePdfDocChange = async ({ currentTarget: input }) => {
        console.log("handle File changed is called");
        console.log(input);
        // var file = input.refs.file.files[0];
        // const isImg = this.validateImg(input.files[0]);
        // if (isImg) {
        console.log(input.files[0]);
        let url = URL.createObjectURL(input.files[0]);
        console.log("here goes url");
        console.log(url);
        let data = { ...this.state.data };
        data[input.name] = input.files[0];
        this.setState({data}, () => {
            console.log("hey am completed and here is my val");
            console.log(this.state);
        });

        // } else {
        //     console.log("not an image lets show error");
        // }
    }


    handlePostalCode = async ({ currentTarget: input }) => {

        let service = await axios.get("https://app.zipcodebase.com/api/v1/search?apikey=71569e90-00b1-11eb-a9dc-1d931302706e", {
            params: { codes: input.value, country: this.state.currentCountry }
        }
        );
        console.log("axios wrking");
        console.log(service.data.results);
        let arr = {}
        let cities = []
        let state = []
        let provinces = []
        let countries = []
        for (var prop in service.data.results) {
            arr = service.data.results[prop];
            for (let i in arr) {
                cities[i] = arr[i].city;
                state[i] = arr[i].state;
                provinces[i] = arr[i].province;
                countries[i] = arr[i].country_code;
            }
        }
        let data = { ...this.state.data }
        data["postal_code"] = input.value;
        console.log("data is");
        console.log(data);
        this.setState({ data, cities: [...new Set(cities)], states: [...new Set(state)], provinces: [...new Set(provinces)] });
    }

    handleEditorChange = async (value) => {

        let data = { ...this.state.data };
        data["coverLetterText"] = value;

        // console.log("setting data values");
        // console.log(data);
        this.setState({ data: data });

    }

    renderEditorButton = (name, label) => {
        return <JoditEditor
            name={name}
            onChange={this.handleEditorChange}
        />
    }


    renderInput = (name, label, type = "text", fieldClass = "not-transparent", onBlurEvent = false) => {
        console.log("am here in renderig input");
        console.log(this.context.gender);

        if (this.props.fieldValues) {
            // console.log("here goes field values");
            // console.log(this.props);
            // console.log(this.props.onChange); 
            const { errors, data } = this.props.fieldValues;
            let fieldValue = data[name] ? data[name] : "";
            return (
                <Input
                    name={name}
                    type={type}
                    value={data[name]}
                    fieldClass={fieldClass}
                    label={label}
                    onChange={this.props.onValChange}
                    errors={errors[name]}
                    onBlur={onBlurEvent}

                />
            );
        } else {


            const { errors, data } = this.state;
            // console.log("Here goes data ....................................")
            //  console.log(data);
            return (
                <Input
                    name={name}
                    type={type}
                    value={data[name]}
                    fieldClass={fieldClass}
                    label={label}
                    onChange={this.handleChange}
                    errors={errors[name]}
                    onBlur={onBlurEvent}
                />
            );
        }

    }

    renderRadioButton = (name, value, btntext, id, fieldClass = "hidden") => {
        if (this.props.fieldValues) {
            let isChecked = false;
            if (this.props.fieldValues.data.gender == value) {
                isChecked = "checked"
            }
            return (
                <label for={id} className="radio">
                    <input
                        checked={isChecked}
                        type="radio" name={name} id={id} value={value} className={fieldClass}
                        onChange={this.props.onValChange} />
                    <span className="label"></span>
                    {btntext}
                </label>
            )
        } else {
            return (
                <label for={id} className="radio">
                    <input type="radio" name={name} id={id} value={value} className={fieldClass}
                        onChange={this.handleChange} />
                    <span className="label"></span>
                    {btntext}
                </label>
            )
        }

    }


    handleDateChange = (date) => {
        console.log("changing date fild");
        console.log(date);
        const data = { ...this.state.data }
        data["dateOfBirth"] = date;
        this.setState({ data });
    }
    renderDateField = (id, name, maxDateVal, label, fieldClass = "") => {
        console.log("max date val is");
        console.log(maxDateVal);
        let date = new Date();
        let month = ""; let year = ""; let day = "";
        if (this.props.fieldValues) {
            if (this.props.fieldValues.data.dateOfBirth) {
                month = Moment(this.props.fieldValues.data.dateOfBirth).format("MM");
                day = Moment(this.props.fieldValues.data.dateOfBirth).format("DD");
                year = Moment(this.props.fieldValues.data.dateOfBirth).format("YYYY");
                date = new Date(year, (month - 1), day);
                console.log(date);
            }
            return (
                <div className={'input-field-wrap mb-3 ' + fieldClass} >
                    <span class="input-label">{label}</span>
                    <DatePicker
                        id={id}
                        name={name}
                        showMonthDropdown
                        showYearDropdown
                        onChange={this.props.onDateChange}
                        disabledKeyboardNavigation
                        selected={date}
                        value={date}
                        dateFormat="MMMM d, yyyy"
                        maxDate={maxDateVal}
                    />
                </div>
            )
        } else {
            return (
                <div className={'input-field-wrap mb-3 ' + fieldClass} >
                    <span class="input-label">{label}</span>
                    <DatePicker
                        id={id}
                        name={name}
                        showMonthDropdown
                        showYearDropdown
                        onChange={this.handleDateChange}
                        disabledKeyboardNavigation
                        selected={this.state.data.dateOfBirth}
                        value={this.state.data.dateOfBirth}
                        maxDate={maxDateVal}
                    />
                </div>
            )

        }
    }

    renderFileButton = (name) => {

        return (
            <React.Fragment>

                <Input type="file" name={name} value=""
                    accept="image/*"
                    onChange={e => { this.props.onFileChange(e) }}
                />
            </React.Fragment>

        )
    }



    renderPDFDocButton = (name) => {

        return (
            <React.Fragment>

                <Input type="file" name={name} value=""
                     accept="application/pdf,application/msword,
                     application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={e => { this.handlePdfDocChange(e) }}
                />
            </React.Fragment>

        )
    }




    renderButton = (name, type, fieldClass = "btn btn-info btn-block my-4", isGoBack) => {
        return (
            <button
                onClick={isGoBack}
                className={fieldClass}
                type={type}>{name}</button>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let { confirmPassword } = this.state.data;

        let errors = {}
        console.log("inside handle submit");
        console.log(this.state.data);
        console.log(this.schema);
        if (confirmPassword) {
            console.log("inside confirm passwrd");
            errors = this.validate(_.pick(this.state.data, ["password", "confirmPassword"]), this.schema);
        } else {
            console.log("inside else");
            errors = this.validate(this.state.data, this.schema);
        }
        console.log("take a look o data");
        console.log(errors);
        this.setState({ errors: errors || {} });
        if (errors) return;
        this.doSubmit(e);
    }








}

export default Form;