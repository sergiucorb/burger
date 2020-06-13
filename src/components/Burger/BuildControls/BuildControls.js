import React from 'react';
import classes from './BuildControls.css'
import BuildControl from "../../../components/Burger/BuildControls/BuildControl/BuildControl";

const buildControls = (props) => {
    const controls = [
        {label: 'Salad', type: 'salad'},
        {label: 'Bacon', type: 'bacon'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Meat', type: 'meat'},
    ]
    let buildControls = controls.map((item, index) => {
        return <BuildControl
            addIngredient={() => props.ingredientAdded(item.type)}
            removeIngredient={() => props.ingredientRemoved(item.type)}
            label={item.label} type={item.type}
            disabled={props.disabled[item.type]}
            key={index}/>
    })
    return (
        <div className={classes.BuildControls}>
            <p>Price: <strong>{props.price.toFixed(2)} $</strong></p>
            {buildControls}
            <button disabled={!props.purchasable} className={classes.OrderButton}
                    onClick={props.modal}>ORDER NOW
            </button>
        </div>
    )
}
export default buildControls;