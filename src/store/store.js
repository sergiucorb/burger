import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import {burgerBuilder} from './reducers/burgerBuilder'
import thunk from "redux-thunk";
import {order} from "./reducers/order";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
);
const rootReducer = combineReducers({
    burgerBuilder: burgerBuilder,
    order: order
});

export const store = createStore(rootReducer, enhancer);