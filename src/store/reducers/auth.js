import {AUTH_SUCCESS, AUTH_START, AUTH_FAIL,AUTH_LOGOUT} from "../actions/types";

const initialState = {
    isAuth: false,
    token: null,
    userId: null,
    error: null,
    loading: false
}

export const auth = (state = initialState, action) => {
    switch (action.type) {

        case AUTH_START:
            return {
                ...state,
                loading: true
            }

        case AUTH_SUCCESS:
            console.log(action)
            return {
                ...state,
                isAuth: true,
                loading: false,
                token: action.token,
                userId: action.userId,
                error: null
            }
        case AUTH_FAIL:
            console.log(action.error + 'yee')
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        default:
            return state
    }
}