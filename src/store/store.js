import {combineReducers, createStore} from "redux";
import {burgerReducer} from './burgerReducer'

const rootReducer = combineReducers({burgerReducer: burgerReducer});

export const store = createStore(rootReducer);