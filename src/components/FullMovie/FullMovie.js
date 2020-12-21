import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Button from '../UI/Button/Button';
import './FullMovie.scss';

const FullMovie = ({ 
    match, 
    moviesList, 
    favoriteMovies,
    isSubmitting, 
    toggleFavoriteMovie 
}) => {
    const { movieId } = match.params;
    
    const fullMovie = moviesList.find(movie => movie.id === +movieId);

    if (!fullMovie) return <Redirect to="/" />;

    const { id, title, poster_path, backdrop_path, overview, release_date } = fullMovie;

    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    const isFavorite = !!favoriteMovies.find(movie => movie.id === id);

    return (
        <div
            className="FullMovie"
            style={{
                backgroundImage: `url(${baseUrl}${backdrop_path})`
            }}
        >
            <h1>{title}</h1>

            <div className="FullMovieContent">
                <div className="ImageWrapper">
                    <img src={baseUrl + poster_path} alt={title} />
                </div>

                <div className="FullMovieInfo">
                    <div className="FullMovieDescription">
                        <strong>{release_date}</strong>
                        <p>{overview}</p>
                    </div>
                    
                    <Button 
                        styling={ isSubmitting ? 'Disabled' : null }
                        onClick={() => {
                            toggleFavoriteMovie( isFavorite ? id : fullMovie );
                        }}
                    >
                        { 
                            isSubmitting 
                                ? 'Submitting...' 
                                : isFavorite
                                    ? 'Remove'
                                    : 'Buy for $50' 
                        }
                    </Button>
                </div>
            </div>
        </div>
    );
};

FullMovie.propTypes = {
    moviesList: PropTypes.arrayOf(PropTypes.object),
    match: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    toggleFavoriteMovie: PropTypes.func.isRequired
};

export default FullMovie;