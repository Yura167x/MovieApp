import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Modal.module.scss';

const Modal = ({ showModal, closeModal, children }) => {
    const modalClasses = [
        cssClasses.Modal,
        showModal ? cssClasses.Opened : cssClasses.Closed
    ];

    return (
        <>
            <div 
                className={cssClasses.Backdrop} 
                onClick={closeModal}
            />

            <div className={modalClasses.join(' ')}>
                {children}
            </div>
        </>
    );
};

Modal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default Modal;