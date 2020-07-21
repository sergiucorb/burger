import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "axios";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 7
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false

            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false

            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false

            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    option: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,

            }
        },
        loading: false,
        isValidForm: false
    };

    postOrderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        let formData = {};
        for (let formElement in this.state.orderForm) {
            formData[formElement] = this.state.orderForm[formElement]
        }
        let data = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };
        axios.post('https://react-burger-7e1a4.firebaseio.com/orders.json', data)
            .then(res => {
                this.setState({loading: false});
                return res;
            })
            .catch(err => {
                return err;
            })
    };

    checkValidation = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    };

    inputOrderHandler = (event, inputSelectedType) => {
        const updatedForm = {
            ...this.state.orderForm
        };
        const selectedInput = {
            ...updatedForm[inputSelectedType]
        };
        selectedInput.value = event.target.value;
        selectedInput.valid = this.checkValidation(selectedInput.value, selectedInput.validation); //check input validation
        selectedInput.touched = true;

        let isValidForm = true;
        for (let input in updatedForm) {
            isValidForm = updatedForm[input].valid && isValidForm
        }
        updatedForm[inputSelectedType] = selectedInput;
        this.setState({
            orderForm: updatedForm,
            isValidForm: isValidForm
        })
        // let updatedOrderForm = {...this.state.orderForm, [item]: event.target.value}; // a shorter approach
    };

    render() {
        let ordersFormArray = [];
        for (let key in this.state.orderForm) {
            ordersFormArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.postOrderHandler}>
                <h3>Enter your Contact data</h3>
                {ordersFormArray.map((item, index) => {
                    return <Input key={item.id}
                                  value={item.config.value}
                                  invalid={!item.config.valid}
                                  touched={item.config.touched}
                                  shouldValidate={item.config.validation}
                                  elementType={item.config.elementType}
                                  elementConfig={item.config.elementConfig}
                                  changed={(event) => this.inputOrderHandler(event, item.id)}/>
                })}
                <Button disabled={!this.state.isValidForm} btnType='Success'>ORDER</Button>
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