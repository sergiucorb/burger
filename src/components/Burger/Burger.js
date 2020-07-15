import React from 'react';
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import classes from './Burger.css'
import {withRouter} from "react-router";

const Burger = (props) => {
    let transformedIngredients = props.ingredients.map((el, index) => {
        return <BurgerIngredients key={index} type={el}/>
    });
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Empty Burger</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    )
}
export default withRouter(Burger);

