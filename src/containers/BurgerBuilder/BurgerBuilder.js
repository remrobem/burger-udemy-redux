import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import burgerDB from '../../../src/burgerDB';
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad: .3,
    bacon: .5,
    cheese: .2,
    meat: 2.2,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        checkoutLoading: false,
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    updatePurchaseState = (ingredients) => {
        // turn object into array, new array of values, sum values
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, item) => {
                return sum + item
            }, 0);
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientBuilder = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = INGREDIENT_PRICES[type] + this.state.totalPrice;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        // need to pass working copy of ingredients cuz setState may not complete before
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientBuilder = (type) => {

        if (this.state.ingredients[type]) {
            const updatedCount = this.state.ingredients[type] - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
            // need to pass working copy of ingredients cuz setState may not complete before
            this.updatePurchaseState(updatedIngredients);
        };
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        // console.log('Continue')
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Rob',
                address: {
                    street: '123 Maple Ave',
                    city: 'Anytown',
                    state: 'NC',
                    zip: '12345'
                },
                email: 'donotreply@email.com'
            },
            deliveryMethod: 'fastest'
        }
        this.setState({checkoutLoading: true});
        burgerDB.post('/orders.json', order)
            .then(response => {
                console.log('burgerDB post: ', response)
                this.setState({checkoutLoading: false, purchasing: false});
            })
            .catch(error => {
                console.log('burgerDB error: ', error)
                this.setState({checkoutLoading: false, purchasing: false});
            })

    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (var key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        let orderSummary = 
       <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
        />

        if (this.state.checkoutLoading) {
            orderSummary = <Spinner />
        };

        return (
            <Aux>
                {/* does not need to render on change (Modal and Order Summary) */}
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientBuilder}
                    ingredientRemoved={this.removeIngredientBuilder}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler} />
            </Aux>
        )
    };

};

export default BurgerBuilder;