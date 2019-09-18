import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import burgerDB from '../../../../src/burgerDB';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            city: '',
            state: '',
            zip: '',
        },
        loading: false,
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'this.name',
                address: {
                    street: 'this.street',
                    city: 'this.city',
                    state: 'this.state',
                    zip: 'this.zip'
                },
                email: 'this.email'
            },
            deliveryMethod: 'fastest'
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

    render() {
        let form = (
        <form>
            <input className={styles.Input} type='email' name='email' placeholder='your email' />
            <input className={styles.Input} type='text' name='name' placeholder='your name' />
            <input className={styles.Input} type='text' name='street' placeholder='your street' />
            <input className={styles.Input} type='text' name='city' placeholder='your city' />
            <input className={styles.Input} type='text' name='state' placeholder='your state' />
            <input className={styles.Input} type='text' name='zip' placeholder='your zip' />
            <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
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