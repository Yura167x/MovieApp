import React from 'react';

import './Footer.scss';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className="Footer">
            <strong>All Rights Reserved, {year}</strong>
        </div>
    );
};

export default Footer;