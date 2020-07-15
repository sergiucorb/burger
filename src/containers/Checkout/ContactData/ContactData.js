import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "axios";

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        price: '',
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        let data = {
            name: this.state.name,
            email: this.state.email,
            address: {
                street: this.state.address.street,
                postalCode: this.state.address.postalCode
            },
            ingredients: this.props.ingredients,
            price: this.props.price
        };
        axios.post('https://react-burger-7e1a4.firebaseio.com/orders.json', data)
            .then(res => {
                this.setState({loading: false})
                console.log(res)
                return res;
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }


    render() {
        let form = (
            <form
                onSubmit={this.orderHandler}>
                <h3>Enter your Contact data</h3>
                <input className={classes.Input} type='text' name='name'
                       value={this.state.name}
                       onChange={(event) => this.setState({name: event.target.value})}
                       placeholder='Your Name'/>

                <input className={classes.Input} type='email' name='email' value={this.state.email}
                       onChange={(event) => this.setState({email: event.target.value})}
                       placeholder='Your Email'/>

                <input className={classes.Input} type='text' name='street' defaultValue={this.state.address.street}
                       onChange={(event) => this.setState({address: {street: event.target.value}})}
                       placeholder='Your Street'/>

                <input className={classes.Input} type='text' name='postalCode'
                       defaultValue={this.state.address.postalCode}
                       onChange={(event) => this.setState({address: {postalCode: event.target.value}})}
                       placeholder='Your Postal Code'/>

                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        )
    }
}

export default ContactData;