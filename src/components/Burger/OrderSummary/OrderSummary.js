import React from 'react';
import Aux from '../../../hoc/Aux'

const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients).map((igKey,index) => {
        return (<li key={index}><span style={{textTransformation:'uppercase'}}>{igKey}</span>: {props.ingredients[igKey]}</li>)
    })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    )
}
export default orderSummary;