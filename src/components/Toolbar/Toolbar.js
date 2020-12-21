import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../Navigation/Navigation';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import './Toolbar.scss';

const Toolbar = ({ 
    search, 
    isFetching,
    isAuthenticated,
    onChange, 
    onClick,
    logout
}) => {
    return (
        <div className="Toolbar">
            <Input 
                name="search"
                placeholder="Search..."
                value={search}
                onChange={onChange}
            />

            <Navigation 
                isAuthenticated={isAuthenticated}
                logout={logout} 
            />

            <Button 
                styling={ isFetching ? 'Disabled' : null}
                onClick={onClick}
            >
                { isFetching ? 'Searching...' : 'Search' }
            </Button>
        </div>
    );
};

Toolbar.propTypes = {
    search: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default Toolbar;