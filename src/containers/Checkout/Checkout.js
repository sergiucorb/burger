import React, {Component} from 'react';
import classes from './Checkout.css'
import CheckoutSummary from "../../components/UI/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {resetBurger} from "../../store/actions";

class Checkout extends Component {

    state = {
        showForm: false,
    };

    // componentWillMount() {
    //     console.log(100)
    //     this.props.redirect ? this.history.push('/') :null
    //
    // }

    checkoutContinueHandler = () => {
        this.props.history.push(this.props.match.url + '/contact-data')
    };

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    };

    closeModal = () => {
        this.setState({showForm: false})
    };

    render() {
        let summary = <Redirect to='/'/>
        if (this.props.ingredients.length > 0) {
            if (this.props.redirect) {
                return <Redirect to='/'/>
            }
            summary = (
                <div className={classes.Checkout}>
                    <CheckoutSummary checkoutContinueHandler={this.checkoutContinueHandler}
                                     checkoutCancelHandler={this.checkoutCancelHandler}
                                     ingredients={this.props.ingredients}/>
                    <Route path={this.props.match.path + '/contact-data'}
                           render={() => <ContactData price={this.props.price} ingredients={this.props.ingredients}/>}/>
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        redirect: state.order.redirect
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // resetBurger: () => dispatch(resetBurger())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);


// repeatIngredients(item, times) {
//     let result = [];
//     for (let i = 0; i < times; i++) {
//         result.push(item)
//     }
//     return result;
// }

// componentDidMount() {
//     const extractParams = new URLSearchParams(this.props.location.search);
//     const obj = {};
//     let price = 0;
//     for (let param of extractParams.entries()) {
//         if (param[0] !== 'price') {
//             obj[param[0]] = param[1]
//
//         } else {
//             price = param[1];
//         }
//     }
//     let ingredients = [];
//     //Obj entries => [ ["cheese", 3], ... ]
//     Object.entries(obj).map(item => {
//         return this.repeatIngredients(item[0], item[1]).map(value => {
//             return ingredients.push(value)
//         });
//     });
//     this.setState({
//         ingredients: ingredients,
//         price: price
//     })
// }
