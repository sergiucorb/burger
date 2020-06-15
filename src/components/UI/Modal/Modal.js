import React from 'react';
import classes from './Modal.css';
import Aux from "../../../hoc/Aux";

const modal = (props) => {
    let styleDivX = {
        display: "flex",
        justifyContent: "flex-end",
        cursor: "pointer"
    }
    let styleShow = {
        transform: props.modal ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.modal ? '1' : '0'
    }
    return (
        <div className={classes.Modal} style={styleShow}>
            <div style={styleDivX} onClick={props.closeModal}>
                x
            </div>
            {props.children}
        </div>
    )
}

export default modal;