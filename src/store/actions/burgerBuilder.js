import {ADD, FETCH_INGREDIENTS_FAILED, GET_INGREDIENTS, REMOVE, RESET_BURGER} from "./types";
import axios from "../../axios-orders";

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

export const fetchIngredientsFailed = () => {
    return {
        type: FETCH_INGREDIENTS_FAILED
    }
}
export const saveIngredients = (ingredients) => {
    return {
        type: GET_INGREDIENTS,
        ingredients
    }
}

export const getIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-7e1a4.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(saveIngredients(res.data))
            }).catch(err => {
            dispatch(fetchIngredientsFailed())
        })
    }
}
export const resetBurger = () => {
    return {
        type: RESET_BURGER
    }
}