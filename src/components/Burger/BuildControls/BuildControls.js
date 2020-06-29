import React from 'react';
import classes from './BuildControls.css'
import BuildControl from "../../../components/Burger/BuildControls/BuildControl/BuildControl";

const buildControls = (props) => {
    const controls = props.allIngredients.map(el => {
        return {type: el, label: el}
    });

    let buildControls = controls.map((item, index) => {
        return <BuildControl
            addIngredient={() => props.ingredientAdded(item.type)}
            removeIngredient={() => props.ingredientRemoved(item.type)}
            label={item.label} type={item.type}
            disabled={props.ingredients.filter(el => el === item.type).length === 0}
            key={index}/>
    });
    return (
        <div className={classes.BuildControls}>
            <p>Price: <strong>{Math.abs(parseFloat(props.price.toFixed(2)))} $</strong></p>
            {buildControls}
            <button disabled={!props.purchasable} className={classes.OrderButton}
                    onClick={props.modal}>ORDER NOW
            </button>
        </div>
    )
}
export default buildControls;