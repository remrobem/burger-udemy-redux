import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        // ingredients: {
        //     salad: 1,
        //     meat: 1,
        //     bacon: 1,
        //     cheese: 1
        // },
        ingredients: {},
        price: 0,
    };

    componentDidMount() {
        // parse query parameters
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        console.log('query entries: ', query)
        let price = 0;
        for (let param of query.entries()) {
            console.log(param)
            if (param[0] === 'price') {
                price = +param[1]
            } else {
                // the + makes the value numeric
                ingredients[param[0]] = +param[1];
                // console.log(ingredients) 
            }

        }
        this.setState({ ingredients: ingredients, totalPrice: price})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render () {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    // use render so props can be passed to ContactData
                    // props sends history - so ContactData can route to '/'
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        )
    };
};

export default Checkout;