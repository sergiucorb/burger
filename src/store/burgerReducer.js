import {ADD, REMOVE} from "./types";

const initialState = {
    ingredients: [],
    price: 0,
    ingredientsPrice: {
        salad: 0.4,
        cheese: 0.5,
        meat: 1.3,
        bacon: 1.2,
    }
};

export const burgerReducer = (state = initialState, action) => {

    switch (action.type) {
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
    }
    return state

};