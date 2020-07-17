import React, {Component} from 'react';
import Spinner from "../../components/UI/Spinner/Spinner";
import Order from "../../components/Order/Order";
import axios from 'axios';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    state = {
        orders: [],
        loading: false
    };

    componentDidMount() {
        this.setState({loading: true});
        axios.get('https://react-burger-7e1a4.firebaseio.com/orders.json')
            .then(res => {
                let fetchingOrders = [];
                for (let key in res.data) {
                    fetchingOrders.push({
                        order: res.data[key],
                        id: key
                    })
                }

                this.setState({
                    orders: fetchingOrders,
                    loading: false
                });
            }).catch(err => {
            console.log(err);
            return err;
        })
    }

    render() {
        let ingredients = <Spinner/>;
        if (!this.state.loading) {
            ingredients = this.state.orders.map((order, index) => {
                return <Order ingredients={order.order.ingredients}
                              price={order.order.price}
                              key={index}/>
            })
        }
        return (
            <div>
                {ingredients}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);