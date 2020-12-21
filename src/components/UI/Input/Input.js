import React from 'react';
import PropTypes from 'prop-types';

import './Input.scss';

const Input = ({ 
    type = 'text', 
    name = '',
    placeholder = '',
    value, 
    onChange,
    onBlur
}) => (
    <input 
        className="Input"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
    />
);

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func
};

export default Input;