import React, {Component} from 'react';
import {connect} from "react-redux";
import Burger from "../../Burger/Burger";
import classes from './ViewOrder.css';

class ViewOrder extends Component {

    ingrCounter = (ingredients, item) => {
        return ingredients.filter(el => el === item).length;
    }

    render() {


        let order = '';
        if (this.props.redirect && this.props.orderDetails) {
            let id = this.props.orderDetails.id
            const unique = [...new Set(this.props.orderDetails.order.data[id].ingredients)];
            console.log(unique)
            let display = unique.map(item => {
                return <li>{item}:
                    <span>{this.ingrCounter(this.props.orderDetails.order.data[id].ingredients, item)}</span>
                </li>
            })
            order = (
                <div>
                    <Burger ingredients={this.props.orderDetails.order.data[id].ingredients}/>
                    <div className={classes.Ingredients}>
                        <div>
                            <p style={{fontSize: '20px'}}>Ingredients: </p><span>{display}</span>

                        </div>
                        <p style={{fontSize: '20px'}}>
                            Price: <strong>
                            <span>{this.props.orderDetails.order.data[id].price.toFixed(2)}$</span>
                            </strong>
                        </p>
                    </div>

                </div>
            )
        } else {
            order = this.props.history.goBack()
        }
        return (
            <div>
                {order}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orderDetails: state.order.viewOrder,
        redirect: state.order.viewRedirect

    }
}
export default connect(mapStateToProps)(ViewOrder);
