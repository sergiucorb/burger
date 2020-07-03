import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICE = {
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 1.2,
};

const INGREDIENTS = [];

class BurgerBuilder extends Component {
    state = {
        ingredients: [],
        price: 0,
        purchasable: false,
        modal: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        console.log(33)
        axios.get('https://react-burger-7e1a4.firebaseio.com/ingredients.json')
            .then(res => {
                Object.keys(res.data).map(item => {
                    return INGREDIENTS.push(item)
                });
                this.setState({loading: false})
            }).catch(err => {
            this.setState({error: true});
        })
    }

    addIngredientHandler = (type) => {
        const updateIngredients = [
            ...this.state.ingredients
        ];
        updateIngredients.push(type);
        let newPrice = updateIngredients.reduce((total, type) =>
            total + INGREDIENTS_PRICE[type]
            , 0);

        this.setState({
            ingredients: updateIngredients,
            price: newPrice
        });
        this.updatePurchaseHandler(updateIngredients);

    };

    removeIngredientHandler = (type) => {
        const updateIngredients = [
            ...this.state.ingredients
        ];
        updateIngredients.splice(updateIngredients.indexOf(type), 1);
        let newPrice = updateIngredients.reduce((total, type) => total + INGREDIENTS_PRICE[type], 0);
        this.setState({
            ingredients: updateIngredients,
            price: newPrice
        });
        this.updatePurchaseHandler(updateIngredients);
    };

    updatePurchaseHandler(ingredients) {
        this.setState({purchasable: ingredients.length > 0})
    }

    showModal = () => {
        this.setState({modal: true})
    };

    closeModal = () => {
        this.setState({modal: false})
    };

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
    };

    render() {
        let orderSpinner = <OrderSummary allIngredients={INGREDIENTS}
                                         ingredients={this.state.ingredients}
                                         closeModal={this.closeModal}
                                         purchasableContinue={this.continuePurchasableHandler}
                                         price={this.state.price}/>;


        let burger = !this.state.error ? <Spinner/> : <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p>;

        if (INGREDIENTS.length > 0) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls price={this.state.price}
                                   allIngredients={INGREDIENTS}
                                   ingredients={this.state.ingredients}
                                   ingredientAdded={this.addIngredientHandler}
                                   ingredientRemoved={this.removeIngredientHandler}
                                   purchasable={this.state.purchasable}
                                   modal={this.showModal}/>
                </Aux>
            );
        }
        if (this.state.loading) {
            orderSpinner = <Spinner/>;
        }
        return (
            <Aux>
                <Modal modal={this.state.modal} closeModal={this.closeModal}>
                    {orderSpinner}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);