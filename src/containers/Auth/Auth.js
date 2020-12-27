import React, {useState,useEffect} from 'react'
import Input from "../../components/UI/Input/Input";
import classes from './Auth.css'
import Button from "../../components/UI/Button/Button";
import {useDispatch,useSelector} from "react-redux";
import {onAuthSubmit} from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect, withRouter} from "react-router";

const Auth =(props)=> {
const [state,setState] = useState(
    { 
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
    isSignIn: true})

   const authRedirect = useSelector(state=>state.auth.redirect) 
   const error = useSelector(state=>state.auth.error) 
   const loading = useSelector(state=>state.auth.loading) 

   const dispatch = useDispatch();

   const checkValidation = (value, rules) => {
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

   const  inputChangeHandler = (event, input) => {
        const controls = {
            ...state.controls,
            [input]: {
                ...state.controls[input],
                value: event.target.value,
                valid: checkValidation(event.target.value, state.controls[input].validation),
                touched: true
            }
        }
        let isValidForm = true;
        for (let val in controls) {
            isValidForm = controls[val].valid && isValidForm
        }
        setState({...state,controls: controls, isValidForm: isValidForm});
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        dispatch(onAuthSubmit(state.controls.email.value, state.controls.password.value, state.isSignIn))
        setState({
            ...state,
            isValidForm: false
        })
    }
    const onSwitchSignIn = () => {
        setState(prevState => {
            return {
                ...state,
                isSignIn: !prevState.isSignIn
            }
        })
    }


        if (authRedirect) {
            return <Redirect to={'/'}/>
        }
        let formControls = [];
        for (let key in state.controls) {
            formControls.push({
                id: key,
                config: state.controls[key]
            })
        }


        let form = formControls.map(input => {
            return <Input key={input.id}
                          elementType={input.config.elementType}
                          elementConfig={input.config.elementConfig}
                          invalid={!input.config.valid}
                          touched={input.config.touched}
                          changed={(event) => inputChangeHandler(event, input.id)}
                          shouldValidate={input.config.validation}/>
        })
        if (loading) {
            form = <Spinner/>
        }
        let errorMessage = null;
        if (error) {
            errorMessage = (
                <p style={{
                    color: 'red',
                    height: 'auto',
                    backgroundColor: 'pink',
                    borderRadius: '4px',
                    padding: '10px',
                    margin: '20px auto'
                }}>
                    {error}
                </p>
            )
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={onSubmitHandler}>
                    {form}
                    <Button disabled={!state.isValidForm} btnType='Success'>SUBMIT</Button><br/>

                </form>
                <Button clicked={onSwitchSignIn}
                        btnType='Info'>SWITCH TO {state.isSignIn ? 'SIGN IN' : "SIGN UP"}</Button>
            </div>
        )
    
}
export default withRouter(Auth);