import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    let inputClasses = [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        console.log(999)
        inputClasses.push(classes.Invalid)
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.elementConfig.type}!</p>
    }

    switch (props.elementType) {
        case ('input') :
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig} onChange={props.changed} value={props.value}/>;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig} onChange={props.changed} value={props.value}/>;
            break;
        case ('select'):
            console.log(props.value);
            let options = props.elementConfig.option.map((option, index) => {
                return <option defaultValue={option.value} value={option.value}
                               key={index}>{option.displayValue}</option>
            });
            inputElement = (
                <select className={inputClasses.join(' ')} onChange={props.changed} value={props.value}>
                    {options}
                </select>);
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig} onChange={props.changed} value={props.value}/>;
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;