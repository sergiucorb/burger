import React from 'react';
import classes from './Order.css'


const order = (props) => {
    let unique = [...new Set(props.ingredients)];
    const ingredientsCounter = (type) => {
        return props.ingredients.filter(el => el === type).length;
    };
    let ingredient = unique.map(item => {
        return item.charAt(0).toLocaleUpperCase() + item.slice(1) + ':' + ingredientsCounter(item) + ', '
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredient}</p>
            <p>Price : <strong>{parseFloat(props.price).toFixed(2)}$</strong></p>
        </div>
    )
};
export default order;