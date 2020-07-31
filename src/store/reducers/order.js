import {
    DELETE_ORDER, DELETE_ORDER_FAIL, DELETE_ORDER_START,
    GET_ORDERS,
    GET_ORDERS_START,
    ORDER_FAILED,
    ORDER_LOADING,
    ORDER_SUCCEED,
    ORDER_SUCCESS_REDIRECT
} from "../actions/types";

const initialState = {
    orderData: [],
    loading: false,
    redirect: false,
    orders: [],
}

export const order = (state = initialState, action) => {
    switch (action.type) {

        case ORDER_LOADING:
            return {
                ...state,
                loading: true
            }

        case ORDER_SUCCEED:
            let newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                orderData: state.orderData.concat(newOrder),
                loading: !state.loading,
                redirect: true
            }

        case ORDER_FAILED:
            return {
                ...state,
                loading: false
            }

        case ORDER_SUCCESS_REDIRECT:
            return {
                ...state,
                redirect: false
            }

        case GET_ORDERS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }

        case (GET_ORDERS_START):
            return {
                ...state,
                loading: true
            }

        case DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(el => el.id !== action.orderId),
                loading: false
            }

        case DELETE_ORDER_START :
            return {
                ...state,
                loading: true
            }

        case DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}