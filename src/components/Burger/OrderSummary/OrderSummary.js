import React from 'react';
import Aux from '../../../hoc/Aux'
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const ingredients = props.allIngredients.map((type, index) => {
        return (
            <li key={index}><span style={{textTransformation: 'uppercase'}}>{type}</span>:
                {props.ingredients.filter(el => el === type).length}
            </li>
        )
    });
    let stylePrice = {
        display: 'inline-block',
        float: 'right'
    };
    let boldPrice = {
        fontWeight: 'bold'
    };

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Continue to Checkout?</p>

            <Button btnType='Danger' clicked={props.closeModal}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchasableContinue}>CONTINUE</Button>
            <p style={stylePrice}>Price: <span style={boldPrice}>{props.price}</span> $</p>
        </Aux>
    )
};
export default orderSummary;