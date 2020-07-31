import React, {PureComponent} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import {addIngredients, removeIngredients, getIngredients} from "../../store/actions/index";
import {resetBurger} from "../../store/actions";

class BurgerBuilder extends PureComponent {
    state = {
        modal: false,
        loading: false,
    };

    componentDidMount() {
        this.props.getIngredientsKey();
        if (this.props.redirect) {
            this.props.resetBurger();
        }
    }

    updatePurchaseHandler(ingredients) {
        return ingredients.length > 0
    }

    showModal = () => {
        this.setState({modal: true})
    };

    closeModal = () => {
        this.setState({modal: false})
    };


    continuePurchasableHandler = () => {

        this.props.history.push('/checkout');
    };

    render() {
        let orderSpinner = <OrderSummary allIngredients={this.props.ingredientsBlock}
                                         ingredients={this.props.ingredients}
                                         closeModal={this.closeModal}
                                         purchasableContinue={this.continuePurchasableHandler}
                                         price={this.props.price}/>;

        let burger = !this.props.error ? <Spinner/> : <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p>;

        if (this.props.ingredientsBlock.length > 0) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls price={this.props.price}
                                   allIngredients={this.props.ingredientsBlock}
                                   ingredients={this.props.ingredients}
                                   ingredientAdded={this.props.addIngredientHandler}
                                   ingredientRemoved={this.props.removeIngredientHandler}
                                   purchasable={this.updatePurchaseHandler(this.props.ingredients)}
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        ingredientsBlock: state.burgerBuilder.ingredientsBlock,
        error: state.burgerBuilder.error,
        redirect: state.order.redirect
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (addedIngredient) => dispatch(addIngredients(addedIngredient)),
        removeIngredientHandler: (removedIngredient) => dispatch(removeIngredients(removedIngredient)),
        getIngredientsKey: () => dispatch(getIngredients()),
        resetBurger: () => dispatch(resetBurger())
    }
};

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axios);


// ingredientsTypeCount = (itemFind) => {
//     return this.props.ingredients.filter(item => item === itemFind).length;
// };

//function continuePurchasableHandler()
// const queryParams = [];
// const ingredients = [...this.props.ingredients];
// let ingredientsSorted = ingredients.sort();
// ingredientsSorted.map((item, index) => {
//     if (ingredientsSorted[index] !== ingredientsSorted[index + 1]) {
//         queryParams.push(encodeURIComponent(ingredientsSorted[index]) + '=' + this.ingredientsTypeCount(ingredientsSorted[index]));
//     }
//     return queryParams
// });
//
// queryParams.push('price=' + this.props.price);
// const queryString = queryParams.join('&');


// pathname: '/checkout',
// search: '?' + queryString