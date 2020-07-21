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
import {addIngredients, removeIngredients} from "../../store/actions";

class BurgerBuilder extends PureComponent {
    state = {
        ingredients: [],
        price: 0,
        purchasable: false,
        modal: false,
        loading: false,
        error: false,
        ingredientsBlock: [],
        ingredientsPrice: {
            salad: 0.4,
            cheese: 0.5,
            meat: 1.3,
            bacon: 1.2,
        }
    };


    componentDidMount() {
        axios.get('https://react-burger-7e1a4.firebaseio.com/ingredients.json')
            .then(res => {
                let ingredients = Object.keys(res.data).map(item => {
                    return item;
                });
                this.setState({loading: false, ingredientsBlock: ingredients})
            }).catch(err => {
            this.setState({error: true});
        })
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if ((this.props.ingredients) && this.props.ingredients.length !== prevProps.ingredients.length) {
    //         console.log(this.props.ingredients)
    //         console.log(prevProps.ingredients)
    //         this.updatePurchaseHandler(this.props.ingredients);
    //     } else {
    //         // this.updatePurchaseHandler(this.props.ingredients);
    //
    //         // this.updatePurchaseHandler(this.props.ingredients);
    //         console.log(1231)
    //     }
    //
    // }

    updatePurchaseHandler(ingredients) {
        this.setState({purchasable: ingredients.length > 0})
    }

    showModal = () => {
        this.setState({modal: true})
    };

    closeModal = () => {
        this.setState({modal: false})
    };

    ingredientsTypeCount = (itemFind) => {
        return this.props.ingredients.filter(item => item === itemFind).length;
    };
    continuePurchasableHandler = () => {
        const queryParams = [];
        const ingredients = [...this.props.ingredients];
        let ingredientsSorted = ingredients.sort();
        ingredientsSorted.map((item, index) => {
            if (ingredientsSorted[index] !== ingredientsSorted[index + 1]) {
                queryParams.push(encodeURIComponent(ingredientsSorted[index]) + '=' + this.ingredientsTypeCount(ingredientsSorted[index]));
            }
            return queryParams
        });

        queryParams.push('price=' + this.props.price);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    render() {
        if (this.props.ingredients.length > 0) {
            this.setState({purchasable: true})
        } else {
            this.setState({purchasable: false})

        }
        let orderSpinner = <OrderSummary allIngredients={this.state.ingredientsBlock}
                                         ingredients={this.props.ingredients}
                                         closeModal={this.closeModal}
                                         purchasableContinue={this.continuePurchasableHandler}
                                         price={this.props.price}/>;

        let burger = !this.state.error ? <Spinner/> : <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p>;

        if (this.state.ingredientsBlock.length > 0) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls price={this.props.price}
                                   allIngredients={this.state.ingredientsBlock}
                                   ingredients={this.props.ingredients}
                                   ingredientAdded={(addedIngredient) => this.props.addIngredientHandler(addedIngredient)}
                                   ingredientRemoved={(ingredient) => this.props.removeIngredientHandler(ingredient)}
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

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerReducer.ingredients,
        price: state.burgerReducer.price
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (addedIngredient) => dispatch(addIngredients(addedIngredient)),
        removeIngredientHandler: (removedIngredient) => dispatch(removeIngredients(removedIngredient)),
    }
};

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder), axios);