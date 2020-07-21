import React, {Component} from 'react';
import classes from './BuildControls.css'
import BuildControl from "../../../components/Burger/BuildControls/BuildControl/BuildControl";
import {connect} from 'react-redux';

class BuildControls extends Component {

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

        return (
            <div className={classes.BuildControls}>
                <p>Price: <strong>{this.props.price.toFixed(2)}$</strong></p>
                {buildControls}
                <button disabled={!this.props.purchasable} className={classes.OrderButton}
                        onClick={this.props.modal}>ORDER NOW
                </button>
            </div>
        )
    }

};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerReducer.ingredients,
        price: state.burgerReducer.price
    }
}
export default connect(mapStateToProps)(BuildControls);