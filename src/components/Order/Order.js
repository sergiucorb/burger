import React from 'react';
import classes from './Order.css'
import Button from "../UI/Button/Button";


const order = (props) => {

    let unique = [...new Set(props.ingredients)];
    const ingredientsCounter = (type) => {
        return props.ingredients.filter(el => el === type).length;
    };
    let ingredientsArray = [];
    unique.map(item => {
        return ingredientsArray.push({
            name: item.charAt(0).toLocaleUpperCase() + item.slice(1),
            amount: ingredientsCounter(item)
        })
    });
    let displayIngredients = ingredientsArray.map((item, index) => {
        return <span className={classes.Ingredients} key={index}>{item.name} : {item.amount}</span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: <span>{displayIngredients}</span></p>
            <p>Price : <strong>{parseFloat(props.price).toFixed(2)}$</strong></p>
            <Button clicked={props.delete} disabled={false} btnType='Danger'>DELETE</Button>
        </div>
    )
};
export default order;