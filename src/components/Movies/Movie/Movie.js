import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Movie.scss';

const Movie = ({ 
    info: {
        title,
        poster_path,
        id
    }
}) => {
    /*
        adult: false
        backdrop_path: "/jQMlDLS5rwjvUEBnzQbs9n74GB9.jpg"
        genre_ids: (2) [12, 35]
        id: 11483
        original_language: "en"
        original_title: "Pirates"
        overview: "Captain Red runs a hardy pirate ship with the"
        popularity: 10.027
        poster_path: "/2NljKDHFCjBATferrMmvWmrWMtj.jpg"
        release_date: "1986-07-18"
        title: "Pirates"
        video: false
        vote_average: 6.3
        vote_count: 96
    */ 

    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className="Movie">
            <h1>{title}</h1>

            <div className="ImageWrapper">
                <img src={baseUrl + poster_path} alt={title} />
            </div>

            <Link to={`/movies/${id}`}>Buy for $50</Link>
        </div>
    );
};

Movie.propTypes = {
    info: PropTypes.object.isRequired
};

export default Movie;