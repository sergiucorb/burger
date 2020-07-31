import React, {Component} from 'react';
import Spinner from "../../components/UI/Spinner/Spinner";
import Order from "../../components/Order/Order";
import axios from 'axios';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {getOrders, onDelete} from "../../store/actions";
import {connect} from "react-redux";

class Orders extends Component {

    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        let orders = <Spinner/>
        if (!this.props.loading && this.props.orders) {
            orders = this.props.orders.map((order, index) => {
                console.log(order)
                return <Order ingredients={order.ingredients}
                              price={order.price}
                              delete={() => this.props.onDelete(order.id)}
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
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: () => dispatch(getOrders()),
        onDelete: (order) => dispatch(onDelete(order)),
    }
}

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(Orders), axios);

