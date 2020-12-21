import { 
    SET_MOVIES_LIST, 
    TOGGLE_FETCHING_STATUS, 
    ADD_FAVORITE_MOVIES,
    ADD_MOVIE_TO_FAVORITE, 
    TOGGLE_SUBMITTING_STATUS,
    REMOVE_MOVIE_FROM_FAVORITE
} from '../actionTypes';

const initialState = {
    moviesList: [],
    favoriteMovies: [],
    isFetching: false,
    isSubmitting: false,
};

const setMovieList = (state, action) => ({
    ...state,
    moviesList: action.moviesList
});

const addFavoriteMovies = (state, action) => ({
    ...state,
    favoriteMovies: action.movies
})

const addMovieToFavorite = (state, action) => ({
    ...state,
    favoriteMovies: [...state.favoriteMovies, action.favoriteMovie]
});

const removeMovieFromFavorite = (state, action) => ({
    ...state,
    favoriteMovies: state.favoriteMovies.filter(movie => movie.id !== action.movieId)
});

const toggleFetchingStatus = (state, action) => ({
    ...state,
    isFetching: action.status
});

const toggleSubmittingStatus = (state, action) => ({
    ...state,
    isSubmitting: action.status
});

const reducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case SET_MOVIES_LIST: return setMovieList(state, action);
        case ADD_FAVORITE_MOVIES: return addFavoriteMovies(state, action);
        case ADD_MOVIE_TO_FAVORITE: return addMovieToFavorite(state, action);
        case REMOVE_MOVIE_FROM_FAVORITE: return removeMovieFromFavorite(state, action);
        case TOGGLE_FETCHING_STATUS: return toggleFetchingStatus(state, action);
        case TOGGLE_SUBMITTING_STATUS: return toggleSubmittingStatus(state, action);
        default: return state;
    }
};

export default reducer;