import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ type = 'button', onClick, children, styling }) => {
    const cssClasses = ['Button'];

    if (styling) {
        cssClasses.push(styling);
    }

    return (
            <button 
                className={cssClasses.join(' ')}
                type={type}
                onClick={onClick}
            >
                {children}
            </button>
    );
};
    
Button.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    styling: PropTypes.string
};

export default Button;