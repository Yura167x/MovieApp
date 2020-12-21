import React from 'react';
import PropTypes from 'prop-types';

import './ErrorMessages.scss';

const ErrorMessages = ({ errorMessages }) => {
    if (!errorMessages) return null;

    let messages;

    if (Array.isArray(errorMessages)) {
        messages = errorMessages.map((errorMessage, i) => (
            <p key={i}>{errorMessage}</p>
            ));
    } else {
        messages = <p>{errorMessages}</p>;
    }

    return (
        <div className="ErrorMessages">
            {messages}
        </div>
    );
};

ErrorMessages.propTypes = {
    errorMessages: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string
    ])
};

export default ErrorMessages;
