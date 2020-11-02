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
export const onLogout = () => {
    return dispatch => {
        localStorage.removeItem('token')
        localStorage.removeItem('expirationDate')
        localStorage.removeItem('userId')
        dispatch(logout())
    }
}
export const authCheckoutTimer = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expiresIn * 1000)
    }
}
export const onAuthSuccess = (userId, token) => {
    return {
        type: AUTH_SUCCESS,
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
                const expirationDate = new Date(new Date().setSeconds(res.data.expiresIn));
                console.log(expirationDate);
                console.log(new Date())
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', res.data.localId)
                dispatch(onAuthSuccess(res.data.localId, res.data.idToken))
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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            let expirationDate = localStorage.getItem('expirationDate');
            expirationDate = new Date(expirationDate).getTime();
            console.log(expirationDate)
            const userId = localStorage.getItem('userId');
            if (expirationDate < new Date().getTime()) {
                console.log('a expirat timpul ?')
                dispatch(logout())
            } else {
                dispatch(onAuthSuccess(token, userId))
                console.log(new Date(expirationDate))
                console.log(new Date(expirationDate - new Date().getTime()).getSeconds());
                dispatch(authCheckoutTimer(new Date(expirationDate - new Date().getTime()).getSeconds()))
            }
        }
    }
}