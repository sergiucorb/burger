import React from 'react';
import classes from './BuildControl.css';

const burgerControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>
                {props.label}
            </div>
            <button onClick={props.removeIngredient} className={classes.Less} disabled={props.disabled}>
                Less
            </button>

            <button onClick={props.addIngredient} className={classes.More}>
                More
            </button>

        </div>
    )
}
export default burgerControl