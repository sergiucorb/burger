import {ADD, REMOVE} from "./types";

export const addIngredients = (payload) => {
    return {
        payload,
        type: ADD
    }
};

export const removeIngredients = (payload) => {
    return {
        payload,
        type: REMOVE
    }
};