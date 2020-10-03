import Joi from 'joi';
import React, { Component } from 'react';
import csc from 'country-state-city'
import Form from './common/form';
import { sidebar } from './common/sidebar';
import axios from 'axios';
import { editProfile } from './../services/editProfileService';

class Addresses extends Form {
    state = {
        data: {},
        errors: {},
        countries: {},
        cities: {},
        provinces: {},
        states: {},
        currentCountry: '',
        isButtonClicked: false
    }
    schema = {
        address_name: Joi.string(),
        phone: Joi.string(),
        country_code: Joi.string(),
        postal_code: Joi.string(),
        address_line_1: Joi.string(),
        address_line_2: Joi.string(),
        landmark: Joi.string(),
        city: Joi.string(),
        province: Joi.string(),
        regions: Joi.string(),

    }
    componentDidMount = async () => {
        console.log("on component DId mount function");
        console.log(this.props);
        let data = { ...this.state.data };
        if (this.props.user) {
            data['address'] = this.props.user.address;
        }


        let countriesData = csc.getAllCountries();
        let countries = {};
        for (let i in countriesData) {
            countries[countriesData[i].sortname] = countriesData[i].name;
        }

        let showPosition = async (position) => {
            // console.log({ "lat": position.coords.latitude, "lng": position.coords.longitude })
            let response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`)
            // console.log("here goes response");
            // console.log(response);
            data['country_code'] = response.data.countryCode;
            this.setState({ data, countries });
        }
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    // handlePostalCode = async ({ currentTarget: input }) => {
    //     // console.log(e.currentTarget);
    //     let service = await axios.get("https://app.zipcodebase.com/api/v1/search?apikey=71569e90-00b1-11eb-a9dc-1d931302706e", {
    //         params: { codes: input.value, country: this.state.currentCountry }
    //     }
    //     );
    //     console.log("axios wrking");
    //     console.log(service.data.results);
    //     let arr = {}
    //     let cities = []
    //     let state = []
    //     let provinces = []
    //     let countries = []
    //     for (var prop in service.data.results) {
    //         arr = service.data.results[prop];
    //         for (let i in arr) {
    //             cities[i] = arr[i].city;
    //             state[i] = arr[i].state;
    //             provinces[i] = arr[i].province;
    //             countries[i] = arr[i].country_code;
    //         }
    //     }
    //     let data = {
    //         postal_code: input.value,
    //         city: [...new Set(cities)],
    //         state: [...new Set(state)],
    //         province: [...new Set(provinces)],
    //         country_code: [...new Set(countries)]
    //     }
    //     console.log("data is");
    //     console.log(data);
    //     this.setState({ data });


    // }
    // handleSelectChange = ({ currentTarget: input }) => {
    //     this.setState({ currentCountry: input.value });
    // }

    doSubmit = async (e) => {
        e.preventDefault();
        console.log("doSubmit is called");
        try {
            let response = await editProfile(this.state.data);
            console.log("here goes response");
            console.log(response);
        } catch (err) {
            console.log("some error happened");
            console.log(err.message);
            console.log(err.response);
        }

    }
    addAddressBtn = () => {
        this.setState({ isButtonClicked: true });
    }
    render() {

        let cities = [];
        if (this.state.data) {
            cities = this.state.data.city;
        }
        // console.log("here goes cities");
        // console.log(cities);
        console.log("here goes state in redner after didmount function");
        console.log(this.state);
        // if (this.state.currentCountry) {
        //     console.log(this.state.currentCountry);
        // } 
        let { isButtonClicked } = this.state;
        let { address } = this.state.data;
        console.log("here goes address");
        console.log(address);
        console.log("here goes country");
        // console.log(csc.getCountryByCode(address.country_code));
        return (
            <div className="pt-5 mt-5">
                <div className="pt-5 pb-5">
                    <div className="profile-settings-wrap bg-dark-blue">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    {sidebar()}
                                </div>
                                {
                                    !isButtonClicked &&
                                    <div className="col-md-8">
                                        <div class="card">
                                            <div class="card-body p-0">
                                                <div className="as-header card-header text-muted">
                                                    <span className="h6 as-title">Edit</span>
                                                </div>
                                                <div className="d-flex align-items-start as-body">
                                                    <div className="profile-info as-fields-wrap address-info">
                                                        <ul className="d-flex align-items-center">
                                                            {address &&
                                                                !address.country_code &&
                                                                <li className="d-flex  w-50 pr-2 flex-column">
                                                                    <button onClick={this.addAddressBtn} className="add-address-btn ">
                                                                        Add address
                                                                    </button>

                                                                </li>
                                                            }

                                                            {address && address.country_code &&
                                                                <li className="d-flex  w-50 pr-2 flex-column">

                                                                    {address.address_name && <span className="d-flex w-100 address-item">
                                                                        <strong>{address.address_name}</strong>
                                                                    </span>
                                                                    }
                                                                    {address.phone.primary && <span className="d-flex w-100 address-item">
                                                                        {address.phone.primary}
                                                                    </span>
                                                                    }
                                                                    {address.address_line_1 && <span className="d-flex w-100 address-item">
                                                                        {address.address_line_1}
                                                                    </span>
                                                                    }
                                                                    {address.address_line_2 && <span className="d-flex w-100 address-item">
                                                                        {address.address_line_2}
                                                                    </span>
                                                                    }
                                                                    {address.landmark && <span className="d-flex w-100 address-item">
                                                                        {address.landmark}
                                                                    </span>
                                                                    }
                                                                    {address.city && < span className="d-flex w-100 address-item">
                                                                        {address.city}
                                                                    </span>
                                                                    }
                                                                    {address.province && <span className="d-flex w-100 address-item">
                                                                        province
                                                                     </span>
                                                                    }
                                                                    {address.state && <span className="d-flex w-100 address-item">
                                                                        {address.state}
                                                                    </span>
                                                                    }
                                                                    {address.postal_code && <span className="d-flex w-100 address-item">
                                                                        {address.postal_code}
                                                                    </span>
                                                                    }
                                                                    {address.country_code && <span className="d-flex w-100 address-item">
                                                                        {address.country_code}
                                                                    </span>
                                                                    }

                                                                </li>

                                                            }




                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {isButtonClicked &&
                                    <div className="col-md-8">
                                        <div class="card">
                                            <div class="card-body p-0">
                                                <div className="as-header card-header text-muted">
                                                    <span className="h6 as-title">Edit</span>
                                                </div>
                                                <form className="form" onSubmit={this.handleSubmit}>
                                                    <div className="d-flex align-items-start as-body">

                                                        <div className="profile-info as-fields-wrap address-info">

                                                            <ul className="d-flex align-items-center">
                                                                <li className="d-flex  w-50 pr-2">
                                                                    {this.renderInput("address_name", "Full Name", "address_name", "transparent", false)}
                                                                </li>
                                                                <li className="d-flex  w-50 pl-2">
                                                                    {this.renderInput("phone", "Phone Number", "phone", "transparent")}
                                                                </li>
                                                                <li className="d-flex w-100 fullwidth-field country-field">
                                                                    <select name="country_code" className="form-control select-style mb-3" id="" onChange={this.handleChange}>
                                                                        <option value="">Select Country</option>
                                                                        {this.state.countries && Object.keys(this.state.countries).map(item => (<option
                                                                            selected={this.state.data.country_code == item && "selected"}
                                                                            value={item}>
                                                                            {this.state.countries[item]}
                                                                        </option>))}
                                                                    </select>
                                                                </li>
                                                                <li className="d-flex w-50 pr-2">
                                                                    {this.renderInput("postal_code", "Postal Code/Zip Code/Pin Code", "postal_code", "transparent", this.handlePostalCode)}
                                                                    {/* <div className='input-field-wrap mb-3 transparent' >
                                                                    <span class="input-label">Postal Code/Zip Code/Pin Code</span>
                                                                    <input
                                                                    className="form-control  input-style "
                                                                    name="postal_code"
                                                                        type="text" id="postal_code"
                                                                        onBlur={this.handlePostalCode} />
                                                                </div> */}
                                                                </li>
                                                                <li className="d-flex w-50 pl-2">
                                                                    {this.renderInput("address_line_1", "Address Line 1", "address_line_1", "transparent")}
                                                                </li>
                                                                <li className="d-flex w-50 pr-2">
                                                                    {this.renderInput("address_line_2", "Address Line 2", "address_line_2", "transparent")}
                                                                </li>
                                                                <li className="d-flex w-50 pl-2">
                                                                    {this.renderInput("landmark", "Landmark", "landmark", "transparent")}
                                                                </li>
                                                                <li className="d-flex w-50 pr-2">
                                                                    <select name="city" className="form-control select-style mb-3" onChange={this.handleChange}>
                                                                        <option value="">Select City</option>
                                                                        {Object.keys(this.state.cities).length != 0 && this.state.cities.map(city =>
                                                                            <option value={city}
                                                                                selected={this.state.data.city == city && "selected"}
                                                                            >
                                                                                {city}
                                                                            </option>)}
                                                                    </select>
                                                                </li>
                                                                <li className="d-flex w-50 pl-2">
                                                                    <select name="province" className="form-control select-style mb-3" onChange={this.handleChange}>
                                                                        <option value="">Select Province/District/Region</option>
                                                                        {Object.keys(this.state.provinces).length != 0 && this.state.provinces.map(province =>
                                                                            <option value={province}
                                                                                selected={this.state.data.province == province && "selected"}
                                                                            >
                                                                                {province}
                                                                            </option>)}
                                                                    </select>
                                                                </li>
                                                                <li className="d-flex w-100 fullwidth-field state-field">
                                                                    <select name="regions" className="form-control select-style mb-3" onChange={this.handleChange}>
                                                                        <option value="">Select State</option>
                                                                        {Object.keys(this.state.states).length != 0 && this.state.states.map(state =>
                                                                            <option value={state}
                                                                                selected={this.state.data.regions == state && "selected"}
                                                                            >
                                                                                {state}
                                                                            </option>)}
                                                                    </select>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="card-footer text-muted">
                                                        {this.renderButton("Update Profile", "submit", "bg-green btn-md text-white ml-auto")}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}

export default Addresses;