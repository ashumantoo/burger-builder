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
    //removing the local storage items after logout
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

//Checking the validity of the token expire Time and Logging out user
//after token expires
export const checkAuthValidity = (tokenExpirationTime) => {
    //token timeout expiration time checking
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
                // making expiresIn time from seconds to milliseconds because javascript time works in milliseconds
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                //setting token and expirationDate to the local storage
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                //sending token and userId from action to the reducer
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthValidity(response.data.expiresIn));
            })
            .catch(error => {
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

//checking user authentication state by getting the data from the local storage
//checking auto logging if token is not expire
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            //if token did not found then just return the user by logging out
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                //if token expiration Date is greater means token has been already expired
                //and if this is the case then logout the user
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthValidity((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}