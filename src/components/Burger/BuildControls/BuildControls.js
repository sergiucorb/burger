import React, {Component} from 'react';
import classes from './BuildControls.css'
import BuildControl from "../../../components/Burger/BuildControls/BuildControl/BuildControl";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class BuildControls extends Component {

    redirectToAuth = () => {
        this.props.history.push('/auth')
    }

    render() {
        const controls = this.props.allIngredients.map(el => {
            return {type: el, label: el}
        });
        let buildControls = controls.map((item, index) => {
            return <BuildControl
                addIngredient={() => this.props.ingredientAdded(item.type)}
                removeIngredient={() => this.props.ingredientRemoved(item.type)}
                label={item.label} type={item.type}
                disabled={this.props.ingredients.filter(el => el === item.type).length === 0}
                key={index}/>
        });
        let button = (this.props.isAuth ?
            <button disabled={!this.props.purchasable} className={classes.OrderButton}
                    onClick={this.props.modal}>ORDER NOW
            </button> :

            <button className={classes.OrderButton}
                    onClick={this.redirectToAuth }>SIGN IN
            </button>)
        return (
            <div className={classes.BuildControls}>
                <p>Price: <strong>{this.props.price.toFixed(2)}$</strong></p>
                {buildControls}
                {button}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        isAuth: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(withRouter(BuildControls));