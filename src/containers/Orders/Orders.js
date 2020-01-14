import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    //and also states are managed by redux
    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount() {
        //Now this http get orders request moved to redux action
        // axios.get('/orders.json')
        //     .then(res => {
        //         console.log(res.data);
        //         const fetchedOrders = [];
        //         for (const key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({ loading: false, orders: fetchedOrders });
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false });
        //     });

        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.Ingredients}
                    price={order.price}
                />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));