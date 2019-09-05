import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import burgerDB from '../../../src/burgerDB';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: .3,
    bacon: .5,
    cheese: .2,
    meat: 2.2,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        checkoutLoading: false,
        ingredientLoadError: false, // used if error with loading ingredient
    };

    componentDidMount() {
        burgerDB.get('/ingredients.json')
            .then(response => {
                let sortedIngredient = Object
                    // array of the ingredient keys
                    .keys(response.data)
                    // sort keys
                    .sort((a, b) => {
                        return response.data[a].sort_order - response.data[b].sort_order
                    })
                    // create array of objects  { ingredient : initial quantity }
                    .map(ingredient => {
                        let obj = {};
                        obj[ingredient] = response.data[ingredient].initial_quantity
                        return obj;
                    })
                    // create single object containing each ingredient : initial quantity pair
                    .reduce((obj, item) => {
                        obj[Object.keys(item)] = parseInt(Object.values(item).join(''));
                        return obj;
                    }, {});

                this.setState({ ingredients: sortedIngredient, ingredientLoadError: false });
            })
            .catch(error => {
                this.setState({ ingredientLoadError: true });
            })
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

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
    };

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
        };
        this.setState({ checkoutLoading: true });

        burgerDB.post('/orders.json', order)
            .then(response => {
                this.setState({ checkoutLoading: false, purchasing: false });
            })
            .catch(error => {
                this.setState({ checkoutLoading: false, purchasing: false });
            })
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (var key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        let orderSummary = null;

        // used to allow for spinner while ingredients lod from DB
        let burger = this.state.ingredientLoadError ? <p>Ingredients Not Loaded</p> : (<Spinner />);

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientBuilder}
                        ingredientRemoved={this.removeIngredientBuilder}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
                />
            );
        };

        if (this.state.checkoutLoading) {
            orderSummary = <Spinner />
        };

        return (
            <Aux>
                {/* does not need to render on change (Modal and Order Summary) */}
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    };
};

export default withErrorHandler(BurgerBuilder, burgerDB);