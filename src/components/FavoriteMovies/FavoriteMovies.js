import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import cssClasses from './FavoriteMovies.module.scss';

const FavoriteMovies = ({ 
    movies, 
    showModal, 
    movieId,
    toggleModal,
    removeFavoriteMovie,
    setMovieId
}) => {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className={cssClasses.FavoriteMovies}>
            {
                showModal &&
                    <Modal 
                        showModal={showModal}
                        closeModal={() => toggleModal(false)}
                    >
                        <p className={cssClasses.Conversation}>
                            Do you really want to remove this movie from the "Favorite" movies?
                        </p>

                        <div className={cssClasses.BtnsWrapper}>
                            <Button 
                                styling="Danger"
                                onClick={() => {
                                    removeFavoriteMovie(movieId);
                                    toggleModal(false);
                                }}
                            >
                                Yes, remove this movie
                            </Button>

                            <Button onClick={() => toggleModal(false)}>
                                No, dismiss
                            </Button>
                        </div>
                    </Modal>
            }

            <table className={cssClasses.Table}>
                <thead className={cssClasses.TableHead}>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Release Date</th>
                        <th>Poster</th>
                        <th>Popularity</th>
                        <th>Overview</th>
                        <th>Adult</th>
                    </tr>
                </thead>

                <tbody className={cssClasses.TableBody}>
                    {movies.map(({
                        id,
                        original_title,
                        release_date,
                        poster_path,
                        popularity,
                        overview,
                        adult
                    }, i) => (
                        <tr 
                            key={id} 
                            className={cssClasses.TableRow}
                            onClick={() => {
                                setMovieId(id);
                                toggleModal(true);
                            }}
                        >
                            <td>{i + 1}</td>
                            <td>{original_title}</td>
                            <td>{release_date}</td>
                            <td>
                                <img 
                                    className={cssClasses.Image}
                                    src={baseUrl + poster_path} 
                                    alt={original_title} 
                                />
                            </td>
                            <td>{popularity}</td>
                            <td className={cssClasses.Overview}>{overview}</td>
                            <td className={cssClasses.Icon}>
                                {
                                    adult
                                        ? <i className="fas fa-check" data-adult="true" />
                                        : <i className="fas fa-times" data-adult="false"/>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

FavoriteMovies.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object),
    showModal: PropTypes.bool.isRequired,
    movieId: PropTypes.number,
    toggleModal: PropTypes.func.isRequired,
    removeFavoriteMovie: PropTypes.func.isRequired,
    setMovieId: PropTypes.func.isRequired
};

export default FavoriteMovies;