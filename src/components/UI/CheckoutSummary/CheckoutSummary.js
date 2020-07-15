import React from 'react';
import Burger from "../../Burger/Burger";
import Button from "../Button/Button";
import {withRouter} from "react-router";

const checkoutSummary = (props) => {
    return (
        <div>{/* put a css */}
            <h1>We hope it tastes well!!</h1>
            <div style={{width: '100%', height: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button clicked={props.checkoutCancelHandler} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.checkoutContinueHandler} btnType='Success'>CONTINUE</Button>

        </div>
    )
}
export default withRouter(checkoutSummary)