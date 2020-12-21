/*import { logoutUser } from '../actions/auth';*/
import { SET_AUTH_ERROR, SAVE_USER, LOGOUT_USER } from '../actionTypes';

const initialState = {
    firebaseKey: null,
    idToken: null,
    localId: null,
    authError: null
};

const setAuthError = (state, action) => ({
    ...state,
    authError: action.errorMessage
});

const saveUser = (state, action) => ({
    ...state,
    firebaseKey: action.firebaseKey,
    idToken: action.idToken,
    localId: action.localId
});

const logoutUser = state => ({
    ...state,
    idToken: null,
    localId: null
});

const reducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        case SET_AUTH_ERROR: return setAuthError(state, action);
        case SAVE_USER: return saveUser(state, action);
        case LOGOUT_USER: return logoutUser(state);
        default: return state;
    }
};

export default reducer;