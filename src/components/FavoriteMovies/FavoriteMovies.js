import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './FavoriteMovies.module.scss';

const FavoriteMovies = ({ movies }) => {
    console.log('[movies]', movies);

    /*
        adult: false
        original_title: "Scooby-Doo! Pirates Ahoy!"
        overview: "Ghost pirates attack the cruise ship that Scooby and the gang are vacationing on."
        popularity: 28.283
        release_date: "2006-01-01"
        poster_path: "/asdasdfadfwar342.jpg"
    */ 

   const baseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className={cssClasses.FavoriteMovies}>
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
                        <tr key={id}>
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
                            <td>
                                {
                                    adult
                                        ? <i class="fas fa-check" />
                                        //: <i class="fas fa-times" />
                                        : <i class="fas fa-check" />
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
    movies:PropTypes.arrayOf(PropTypes.object).isRequired
};

export default FavoriteMovies;