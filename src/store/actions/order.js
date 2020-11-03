import {
    ORDER_SUCCEED,
    ORDER_FAILED,
    ORDER_LOADING,
    ORDER_SUCCESS_REDIRECT,
    GET_ORDERS,
    GET_ORDERS_START,
    GET_ORDERS_FAIL, DELETE_ORDER, DELETE_ORDER_FAIL, DELETE_ORDER_START, VIEW_ORDER, SWITCH_REDIRECT_TO_FALSE
} from "./types";
import axios from '../../axios-orders';

const orderSucceed = (id, orderData) => {
    return {
        type: ORDER_SUCCEED,
        orderData: orderData,
        orderId: id
    }
}
const orderFailed = () => {
    return {
        type: ORDER_FAILED,
    }
}

export const onLoading = () => {
    return {
        type: ORDER_LOADING,
    }
}
const onRedirect = () => {
    return {
        type: ORDER_SUCCESS_REDIRECT
    }
}

export const onSubmitOrder = (data, token) => {
    console.log(data)
    return dispatch => {
        dispatch(onLoading())
        axios.post('https://react-burger-7e1a4.firebaseio.com/orders.json?auth=' + token, data)
            .then(res => {
                dispatch(orderSucceed(res.data.name, data));
                dispatch(onRedirect())
            })
            .catch(err => {
                dispatch(orderFailed());
            })
    }
}

const prepareGetOrder = (orders) => {
    return {
        type: GET_ORDERS,
        orders: orders
    }
}

const getOrderStart = () => {
    return {
        type: GET_ORDERS_START
    }
}
const getOrderFail = () => {
    return {
        type: GET_ORDERS_FAIL
    }
}
export const getOrders = (token,userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        dispatch(getOrderStart())
        axios.get('https://react-burger-7e1a4.firebaseio.com/orders.json'+queryParams)
            .then(res => {
                let fetchingOrders = [];
                for (let key in res.data) {
                    fetchingOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(prepareGetOrder(fetchingOrders))
            }).catch(err => {
            dispatch(getOrderFail(err));
        })
    }
}

const prepareDeleteOrder = (order, id) => {
    return {
        type: DELETE_ORDER,
        order: order,
        orderId: id
    }
}
const deleteOrderFail = () => {
    return {
        type: DELETE_ORDER_FAIL,
    }
}
const deleteOrderStart = () => {
    return {
        type: DELETE_ORDER_START
    }
}
export const onDelete = (id) => {
    return dispatch => {
           let token = localStorage.getItem('token'); 
        dispatch(deleteOrderStart())
        axios.delete('https://react-burger-7e1a4.firebaseio.com/orders.json?auth=' + token, {data: id})
            .then(res => {
                dispatch(prepareDeleteOrder(res, id))
            }).catch(err => {
            dispatch(deleteOrderFail())
        })
    }
}
const prepareViewOrder = (id, order) => {
    return {
        type: VIEW_ORDER,
        id: id,
        order: order,

    }
}
export const onView = (id,token) => {
    return dispatch => {
        axios.get('https://react-burger-7e1a4.firebaseio.com/orders.json?auth=' + token, id)
            .then(res => {
                console.log(res)
                dispatch(prepareViewOrder(id, res))
            })
            .catch(err => {
                return err
            })
    }
}
export const switchRedirectToFalse = () => {
    return {
        type: SWITCH_REDIRECT_TO_FALSE
    }
}