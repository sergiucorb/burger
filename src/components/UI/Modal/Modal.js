import React from 'react';
import classes from './Modal.css';

const modal = (props) => {
    return (
        <div className={classes.Modal}
             style={{
                 transform: props.modal ? 'translateY(0)' : 'translateY(-100vh)',
                 opacity: props.modal ? '1' : '0'
             }}>
            {props.children}
        </div>
    )
}
export default modal;