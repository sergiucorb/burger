import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENTS_PRICE = {
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 1.2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            salad: 0,
            bacon: 0
        },
        price: 0
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const counterIngredient = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = counterIngredient;

        const priceIngredient = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.price;
        const newPrice = priceIngredient + oldPrice;
        this.setState({
            ingredients: updateIngredients,
            price: newPrice
        })
    }


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const oldPrice = this.state.price;
        let ingredientPrice = INGREDIENTS_PRICE[type];
        let newCount = 0;
        if (oldCount <= 0) {
            ingredientPrice = 0;
        } else {
            newCount = oldCount - 1;
        }
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = newCount;
        const newPrice = oldPrice - ingredientPrice;
        this.setState({
            ingredients: updatedIngredient,
            price: newPrice
        })
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls price={this.state.price}
                               ingredientAdded={this.addIngredientHandler}
                               ingredientRemoved={this.removeIngredientHandler}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;