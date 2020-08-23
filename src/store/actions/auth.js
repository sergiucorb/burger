import {AUTH_FAIL, AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT} from "./types";
import axios from "axios";

const onAuthStart = () => {
    return {
        type: AUTH_START
    }
}

export const logout = () => {
    return {
        type: AUTH_LOGOUT
    }
}
export const authCheckoutTimer = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiresIn * 1000)
    }
}
export const onAuth = (email, password, userId, token) => {
    return {
        type: AUTH_SUCCESS,
        email: email,
        password: password,
        userId: userId,
        token: token
    }
}

export const onAuthSubmit = (email, password, isSignIn) => {
    return dispatch => {
        dispatch(onAuthStart());
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGvuUsi6ZuxqH6KfHBfHw5Hf1m4Cu4pdw';
        if (!isSignIn) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGvuUsi6ZuxqH6KfHBfHw5Hf1m4Cu4pdw';
        }
        axios.post(url, data)
            .then(res => {
                console.log(res.data)
                dispatch(onAuth(email, password, res.data.localId, res.data.idToken))
                dispatch(authCheckoutTimer(res.data.expiresIn))
            })
            .catch(err => {
                console.log(err.response)
                dispatch(onAuthFail(err.response.data.error.message))
            })
    }
}

export const onAuthFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    }
}