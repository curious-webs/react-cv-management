import * as React from 'react';
let Input = ({ name, label, errors,fieldClass, ...rest }) => {
    return (
        <div className={'input-field-wrap mb-3 ' + fieldClass} >
            <span class="input-label">{label}</span>
            <input
                name={name}
                id={name}
                className= 'form-control  input-style '
                {...rest}
            />
            {errors && <div className="alert alert-danger">{errors}</div>}
        </div>
    );
};
export default Input;