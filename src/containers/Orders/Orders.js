import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import burgerDB from '../../burgerDB';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import order from '../../components/Order/Order';

class Orders extends Component {

    state = {
        orders: [],
        loading: true,
    };


    componentDidMount() {
        burgerDB.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });
                console.log('fetchedOrders: ', fetchedOrders);
            })
            .catch(err => {
                console.log('burgerDB get error in Orders: ', err)
                this.setState({ loading: false });
            })

    }

    render() {

        return (
            <div>
                {this.state.orders.map((order) => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price} />
                    ))}
            </div>

        );
    }
};

export default withErrorHandler(Orders, burgerDB);
