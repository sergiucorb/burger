import React from 'react';
import classes from './BuildControls.css'
import BuildControl from "../../../components/Burger/BuildControls/BuildControl/BuildControl";

const buildControls = (props) => {
    console.log(props.disabled)
    const controls = [
        {label: 'Salad', type: 'salad'},
        {label: 'Bacon', type: 'bacon'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Meat', type: 'meat'},
    ]
    let buildControls = controls.map((item, index) => {
        return <BuildControl
            addIngredient={() => props.ingredientAdded(item.type)}
            removeIngredient={()=>props.ingredientRemoved(item.type)}
            label={item.label} type={item.type}
            disabled={props.disabled[item.type]}
            key={index}/>
    })
    return (
        <div className={classes.BuildControls}>
            {buildControls}
            <div className={classes.Price}>Price: {props.price.toFixed(2)}</div>
        </div>
    )
}
export default buildControls;