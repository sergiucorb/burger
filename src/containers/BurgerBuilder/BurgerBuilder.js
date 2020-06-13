import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 1.2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        price: 0,
        purchasable: false,
        modal: false
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
        this.updatePurchaseHandler(updateIngredients);

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
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = newCount;
        const newPrice = oldPrice - ingredientPrice;
        this.setState({
            ingredients: updatedIngredients,
            price: newPrice
        })
        this.updatePurchaseHandler(updatedIngredients);
    }

    componentDidMount() {
        const price = {...this.state.ingredients};
        let totalPrice = 0;
        for (let key in price) {
            if (price[key] > 0) {
                totalPrice += INGREDIENTS_PRICE[key] * price[key]
            }
        }
        this.setState({
            ...this.state.ingredients,
            price: totalPrice
        })
    }

    updatePurchaseHandler(ingredients) {
        const sum = Object.values(ingredients)
            .reduce((sum, el) => {
                return sum + el
            });
        this.setState({purchasable: sum > 0})
    }

    showModal = () => {

        this.setState({modal: true})
    }

    render() {
        const disabledIngredient = {...this.state.ingredients};
        for (let key in disabledIngredient) {
            disabledIngredient[key] = disabledIngredient[key] <= 0;
        }

        return (
            <Aux>
                <Modal modal={this.state.modal}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls price={this.state.price}
                               disabled={disabledIngredient}
                               ingredientAdded={this.addIngredientHandler}
                               ingredientRemoved={this.removeIngredientHandler}
                               purchasable={this.state.purchasable}
                               modal={this.showModal}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;