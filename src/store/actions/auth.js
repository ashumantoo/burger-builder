import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

//Checking the validity of the token expire Time and Logging out user
//after token expires
export const checkAuthValidity = (tokenExpirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, tokenExpirationTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        //SignUp api url
        let URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChU1Nn5x0FO0yDFEfQZ2s6rn3bi0T8rFg';
        if (!isSignUp) {
            //login api url
            URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChU1Nn5x0FO0yDFEfQZ2s6rn3bi0T8rFg';
        }

        axios
            .post(URL, authData)
            .then(response => {
                console.log(response);
                //sending token and userId from action to the reducer
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthValidity(response.data.expiresIn));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error.response.data.error));
            });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}