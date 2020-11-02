import {
    DELETE_ORDER, DELETE_ORDER_FAIL, DELETE_ORDER_START,
    GET_ORDERS, GET_ORDERS_FAIL,
    GET_ORDERS_START,
    ORDER_FAILED,
    ORDER_LOADING,
    ORDER_SUCCEED,
    ORDER_SUCCESS_REDIRECT, SWITCH_REDIRECT_TO_FALSE, VIEW_ORDER
} from "../actions/types";

const initialState = {
    orderData: [],
    loading: false,
    redirect: false,
    orders: [],
    viewOrder: {},
    viewOrderLoading: false,
    viewRedirect: false
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
            console.log(44)
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
                loading: false,
                viewRedirect: false
            }

        case GET_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case GET_ORDERS_FAIL:
            return {
                ...state,
                loading: false
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
        case VIEW_ORDER:
            console.log(action)
            const order = {
                id: action.id,
                order: action.order
            }
            return {
                ...state,
                viewOrder: order,
                viewRedirect: true
            }
        case SWITCH_REDIRECT_TO_FALSE:
            return {
                ...state,
                viewRedirect: false
            }
        default:
            return state
    }
}