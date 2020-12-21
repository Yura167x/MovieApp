import React from 'react';
import PropTypes from 'prop-types';

import Movie from './Movie/Movie';
import './Movies.scss';

const Movies = ({moviesList}) => (
    <div className="Movies">
            {moviesList.map(movie => (
                <Movie
                    key={movie.id}
                    info={movie}
                />
            ))}
    </div>
);

Movies.propTypes = {
    moviesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default Movies;