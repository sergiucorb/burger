import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import {burgerBuilder} from './reducers/burgerBuilder'
import {order} from "./reducers/order";
import {auth} from "./reducers/auth";
import thunk from "redux-thunk";


const composeEnhancers = process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilder,
    order: order,
    auth: auth
});

export const store = createStore(rootReducer, enhancer);