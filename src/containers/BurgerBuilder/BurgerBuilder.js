import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENTS_PRICE = {
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 1.2,
}

const INGREDIENTS = [
    "bacon",
    "cheese",
    "meat",
    "salad"
]

class BurgerBuilder extends Component {
    state = {
        ingredients: [],
        price: 0,
        purchasable: false,
        modal: false,
        loading: false
    };

    addIngredientHandler = (type) => {
        const updateIngredients = [
            ...this.state.ingredients
        ];
        updateIngredients.push(type);
        let newPrice = updateIngredients.reduce((total, type) =>
            total + INGREDIENTS_PRICE[type], 0);

        this.setState({
            ingredients: updateIngredients,
            price: newPrice
        });
        this.updatePurchaseHandler(updateIngredients);

    };

    removeIngredientHandler = (type) => {
        const updateIngredients = [
            ...this.state.ingredients
        ]
        updateIngredients.splice(updateIngredients.indexOf(type), 1);
        let newPrice = updateIngredients.reduce((total, type) => total + INGREDIENTS_PRICE[type], 0);
        this.setState({
            ingredients: updateIngredients,
            price: newPrice
        })
        this.updatePurchaseHandler(updateIngredients);
    }

    updatePurchaseHandler(ingredients) {
        this.setState({purchasable: ingredients.length > 0})
    }

    showModal = () => {
        this.setState({modal: true})
    }

    closeModal = () => {
        this.setState({modal: false})
    }

    continuePurchasableHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'Sergiu Corb',
                address: {
                    street: "al iliului",
                    city: 'cluj',
                    postalCode: 432323
                },
                email: 'sergiu@yahoo.com'
            }
        };
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false, modal: false});
                console.log(res)
            })
            .catch(err => {
                this.setState({loading: false, modal: false});
            })
    }


    render() {
        let spinner = <OrderSummary allIngredients={INGREDIENTS}
                                    ingredients={this.state.ingredients}
                                    closeModal={this.closeModal}
                                    purchasableContinue={this.continuePurchasableHandler}
                                    price={this.state.price}/>
        if (this.state.loading) {
            spinner = <Spinner/>
        }
        return (
            <Aux>
                <Modal modal={this.state.modal} closeModal={this.closeModal}>
                    {spinner}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls price={this.state.price}
                               allIngredients={INGREDIENTS}
                               ingredients={this.state.ingredients}
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