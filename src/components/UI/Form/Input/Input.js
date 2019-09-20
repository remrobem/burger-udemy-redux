import React from 'react';
import styles from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    //array of original styles - can be overrrided when validation error
    const inputStyles = [styles.InputElement];

    if (props.invalid && props.shouldValidate) {
        inputStyles.push(styles.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                // inline styles separated by space
                className={inputStyles.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement =
                <textarea
                    className={inputStyles.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />;
            break;
        case ('select'):
            inputElement =
                <select
                    className={inputStyles.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            break;
        default:
            inputElement =
                inputElement = <input
                    className={inputStyles.join(' ')}
                    {...props.elementConfig}
                    value={props.value} />;
            break;
    }


    return (
        <div>
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default input;