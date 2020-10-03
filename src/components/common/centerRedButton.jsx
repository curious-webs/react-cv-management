// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

let RedButton = ({ text, href }) => {
    console.log("center called");
    return (
        <div className="btns-wrapper">
            <Link className="bg-dark-red btn-md text-white mx-auto border-red" to={href}>
                {text}
            </Link>
        </div>
    );
};
export default  RedButton;