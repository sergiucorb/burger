import React, {Component} from 'react'
import Input from "../../components/UI/Input/Input";
import classes from './Auth.css'
import Button from "../../components/UI/Button/Button";
import {connect} from "react-redux";
import {onAuthSubmit} from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect, withRouter} from "react-router";

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    isEmail: true,
                    required: true,
                    minLength: 5,
                    maxLength: 20,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    isPassword: true,
                    minLength: 5,
                    maxLength: 10,
                },
                valid: false,
                touched: false
            },
        },
        isValidForm: false,
        isSignIn: true
    }
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
        if (rules.isEmail) {
            let regexEmail = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
            isValid = regexEmail.test(value) && isValid
        }
        return isValid
    };

    inputChangeHandler = (event, input) => {
        const controls = {
            ...this.state.controls,
            [input]: {
                ...this.state.controls[input],
                value: event.target.value,
                valid: this.checkValidation(event.target.value, this.state.controls[input].validation),
                touched: true
            }
        }
        let isValidForm = true;
        for (let val in controls) {
            isValidForm = controls[val].valid && isValidForm
        }
        this.setState({controls: controls, isValidForm: isValidForm});
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthSubmit(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignIn);
        this.setState({
            ...this.state,
            isValidForm: false
        })
    }
    onSwitchSignIn = () => {
        this.setState(prevState => {
            return {
                isSignIn: !prevState.isSignIn
            }
        })
    }


    render() {
        if (this.props.authRedirect) {
            return <Redirect to={'/'}/>
        }
        let formControls = [];
        for (let key in this.state.controls) {
            formControls.push({
                id: key,
                config: this.state.controls[key]
            })
        }


        let form = formControls.map(input => {
            return <Input key={input.id}
                          elementType={input.config.elementType}
                          elementConfig={input.config.elementConfig}
                          invalid={!input.config.valid}
                          touched={input.config.touched}
                          changed={(event) => this.inputChangeHandler(event, input.id)}
                          shouldValidate={input.config.validation}/>
        })
        if (this.props.loading) {
            form = <Spinner/>
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p style={{
                    color: 'red',
                    height: 'auto',
                    backgroundColor: 'pink',
                    borderRadius: '4px',
                    padding: '10px',
                    margin: '20px auto'
                }}>
                    {this.props.error}
                </p>
            )
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button disabled={!this.state.isValidForm} btnType='Success'>SUBMIT</Button><br/>

                </form>
                <Button clicked={this.onSwitchSignIn}
                        btnType='Info'>SWITCH TO {this.state.isSignIn ? 'SIGN IN' : "SIGN UP"}</Button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthSubmit: (email, password, isSignIn) => dispatch(onAuthSubmit(email, password, isSignIn))
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        authRedirect: state.auth.redirect
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));