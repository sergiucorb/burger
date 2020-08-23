import {ADD, FETCH_INGREDIENTS_FAILED, GET_INGREDIENTS, REMOVE, RESET_BURGER} from "../actions/types";

const initialState = {
    ingredients: [],
    price: 0,
    ingredientsPrice: {
        salad: 0.4,
        cheese: 0.5,
        meat: 1.3,
        bacon: 1.2,
    },
    ingredientsBlock: [],
    error: false
};

export const burgerBuilder = (state = initialState, action) => {

    switch (action.type) {
        case(GET_INGREDIENTS):
            let ingredientsBlock = Object.keys(action.ingredients).map(item => {
                return item;
            });
            return {
                ...state,
                error: !state.error,
                ingredientsBlock: ingredientsBlock
            };

        case(FETCH_INGREDIENTS_FAILED):
            return {
                ...state,
                error: !state.error
            };

        case (ADD):
            const ingredients = state.ingredients.concat(action.payload);
            let currentPrice = state.price;
            const addedIngredientPrice = state.ingredientsPrice[action.payload];
            currentPrice += addedIngredientPrice;
            return {
                ...state,
                ingredients: ingredients,
                price: currentPrice,
            };

        case(REMOVE):
            const updateIngredients = state.ingredients;
            updateIngredients.splice(updateIngredients.indexOf(action.payload), 1);
            let decreasePrice = state.price;
            const removedIngredientPrice = state.ingredientsPrice[action.payload];
            decreasePrice -= removedIngredientPrice;
            return {
                ...state,
                ingredients: updateIngredients,
                price: decreasePrice
            };

        case (RESET_BURGER):
            return {
                ...state,
                price: 0,
                ingredients: []
            };
    }
    return state

};