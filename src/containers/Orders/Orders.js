import React, {Component} from 'react';
import Spinner from "../../components/UI/Spinner/Spinner";
import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {getOrders, onDelete, onView, switchRedirectToFalse} from "../../store/actions";
import {connect} from "react-redux";

class Orders extends Component {

    componentDidMount() {
        this.props.getOrders(this.props.token);
        // this.props.switchRedirectToFalse();
    }


    render() {
        console.log(this.props.isAuth)
        if (this.props.redirect && this.props.orders) {
            console.log('redirect true')
            this.props.history.push('/orders/' + this.props.viewOrderId.id);
        }
        let orders = <Spinner/>
        if (!this.props.loading && this.props.orders) {
            orders = this.props.orders.map((order, index) => {
                console.log(order)
                return <Order ingredients={order.ingredients}
                              price={order.price}
                              delete={() => this.props.onDelete(order.id, this.props.token)}
                              view={() => this.props.onView(order.id, this.props.token)}
                              key={index}/>
            })
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        redirect: state.order.viewRedirect,
        viewOrderId: state.order.viewOrder,
        isAuth: state.auth.isAuth,
        token: state.auth.token
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getOrders: (token) => dispatch(getOrders(token)),
        onDelete: (order) => dispatch(onDelete(order)),
        onView: (orderId, token) => dispatch(onView(orderId, token)),
        switchRedirectToFalse: () => dispatch(switchRedirectToFalse()),
    }
}

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(Orders), axios);

