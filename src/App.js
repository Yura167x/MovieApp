import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Toolbar from './components/Toolbar/Toolbar';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';
import Spinner from './components/UI/Spinner/Spinner';
import FullMovie from './components/FullMovie/FullMovie';
import Auth from './containers/Auth/Auth';
import FavoriteMovies from './components/FavoriteMovies/FavoriteMovies';
import * as moviesActions from './store/actions/movies';
import * as authActions from './store/actions/auth';
import './App.scss';

class App extends Component {
    state = {
      search: ''
    }

  componentDidMount() {
    const { saveUser, getFavoriteMovies, history } = this.props;

    const firebaseKey = localStorage.getItem('firebaseKey');
    const idToken = localStorage.getItem('idToken');
    const localId = localStorage.getItem('localId');

    if (firebaseKey && idToken && localId) {
      getFavoriteMovies(firebaseKey);
      return saveUser(firebaseKey, idToken, localId);
    } 

    history.push('/auth');
  }

  componentDidUpdate(prevProps) {
    const { fetchMovies, isAuthenticated } = this.props;

    if (!prevProps.isAuthenticated && isAuthenticated) {
      fetchMovies('Pirates');
    }
  }

  onChangeInputHandler = e => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }

  fetchMoviesHandler = () => {
    const { search } = this.state;

    if (!search) return;

    const { fetchMovies } = this.props;

    fetchMovies(search);
  }

  logoutAndRedirect = () => {
    const { logoutUser, history } = this.props;

    logoutUser();
    history.push('/auth');
  }

  render() {
    const { search } = this.state;
    const { 
      moviesList, 
      favoriteMovies,
      isFetching, 
      isSubmitting,
      isAuthenticated, 
      toggleFavoriteMovie 
    } = this.props;

    return (
      <div className="App">
        <Toolbar 
          search={search} 
          isFetching={isFetching}
          isAuthenticated={isAuthenticated}
          onChange={this.onChangeInputHandler}
          onClick={this.fetchMoviesHandler}
          logout={this.logoutAndRedirect}
        />

        <Switch>
          {
            isAuthenticated &&
              <Route
                path="/"
                exact
                render={() => (
                  <>
                    { isFetching && <Spinner /> }

                    { 
                      moviesList.length 
                      ? <Movies moviesList={moviesList} /> 
                      : null 
                    }
                  </>
                )} 
              />
          }
          
          {
            isAuthenticated && 
              <Route
                  path="/favorite"
                  render={props => (
                    <FavoriteMovies
                      {...props}
                      movies={favoriteMovies}
                    />
                  )}
              />
          }
          
          {
            !isAuthenticated &&
              <Route
                path="/auth"
                component={Auth} 
              />
          }

          {
            isAuthenticated &&
              <Route
                path="/movies/:movieId"
                render={props => (
                  <FullMovie 
                    {...props}
                    moviesList={moviesList}
                    favoriteMovies={favoriteMovies}
                    isSubmitting={isSubmitting}
                    toggleFavoriteMovie={toggleFavoriteMovie}
                  />
                )} 
              />
          }

          <Redirect from="/*" to="/" />
        </Switch>
        
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  favoriteMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchMovies: PropTypes.func.isRequired,
  toggleFavoriteMovie: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  moviesList: state.movies.moviesList,
  favoriteMovies: state.movies.favoriteMovies,
  isFetching: state.movies.isFetching,
  isSubmitting: state.movies.isSubmitting,
  isAuthenticated: !!state.auth.idToken && !!state.auth.localId
});

const mapDispatchToProps = dispatch => ({
  fetchMovies: search => dispatch(moviesActions.fetchMovies(search)),
  logoutUser: () => dispatch(authActions.logoutUser()),
  saveUser: (firebaseKey, idToken, localId) => {
    dispatch(authActions.saveUser(firebaseKey, idToken, localId));
  },
  toggleFavoriteMovie: favoriteMovie => {
    dispatch(moviesActions.toggleFavoriteMovie(favoriteMovie))
  },
  getFavoriteMovies: firebaseKey => {
    dispatch(moviesActions.getFavoriteMovies(firebaseKey))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
