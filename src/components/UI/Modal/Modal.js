import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from "../../../hoc/Aux/Aux";

import Backdrop from "../Backgrop/Backdrop";

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (nextProps.modal !== this.props.modal) || (nextProps.children !== this.props.children)
    }

    render() {
        let
            styleDivX = {
                display: "flex",
                justifyContent: "flex-end",
                cursor: "pointer"
            }
        let
            styleShow = {
                transform: this.props.modal ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.modal ? '1' : '0'
            }
        return (
            <Aux>
                <Backdrop show={this.props.modal} backdropClicked={this.props.closeModal}/>
                <div className={classes.Modal} style={styleShow}>
                    <div style={styleDivX} onClick={this.props.closeModal}>
                        x
                    </div>
                    {this.props.children}
                </div>
            </Aux>
        );
    }

}

export default Modal;