import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import burgerDB from '../../../../src/burgerDB';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Form/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 9
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fasted Method Available' },
                        { value: 'cheapest', displayValue: 'Least Expensive' }
                    ]
                },
                value: 'fastest',
                validation: {},
                touched: false,
                valid: true,

            },
        },
        loading: false,
        formIsValid: false,
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const formData = {};
        for (let element in this.state.orderForm) {
            console.log(element)
            // like a shallow copy - only highest level object key used
            // this sets key:value pair used to update DB
            formData[element] = this.state.orderForm[element].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };
        this.setState({ checkoutLoading: true });
        burgerDB.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            })
    }

    checkValidity(value, rules) {
        let isValid = true;
        // && isValid used so that last check is not the only the only one used
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        event.preventDefault();
        console.log(event.target.value);
        //shallow copy - no nested values - changing new field will change state
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        //deep copy to get value of the object being updated
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;

        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        updatedFormElement.touched = true;

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let element in updatedOrderForm) {
            formIsValid = updatedOrderForm[element].valid && formIsValid;
        }
        // console.log(updatedFormElement.valid)
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }

    render() {

        const formsElementArray = [];

        for (let key in this.state.orderForm) {
            formsElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formsElementArray.map((el) => (
                        <Input
                            key={el.id}
                            value={el.config.value}
                            elementType={el.config.elementType}
                            elementConfig={el.config.elementConfig}
                            invalid={!el.config.valid}
                            shouldValidate={el.config.validation ? true : false}
                            touched={el.config.touched}
                            changed={(event) => { this.inputChangedHandler(event, el.id) }}
                        />
                    ))
                }
                <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Information</h4>
                {form}
            </div>
        )
    };

};

export default ContactData;