import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {

        //extracting the query params which is passed to the url params
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let params of query.entries()) {
            ingredients[params[0]] = +params[1];
        }
        this.setState({ ingredients: ingredients });
    }

    checkoutCancelledHandler = () => {
        //going back to the previous page using the react router props history goBack method
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <CheckoutSummary
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                ingredients={this.state.ingredients}
            />
        );
    }
}

export default Checkout;