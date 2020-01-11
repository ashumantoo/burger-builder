import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    //============================this pic of code works before the Redux Implementation================
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount() {
    //     //extracting the query params which is passed to the url params
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {

    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ ingredients: ingredients, totalPrice: price });
    // }
    //====================================================================================================

    checkoutCancelledHandler = () => {
        //going back to the previous page using the react router props history goBack method
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        //if ingredients are null then just redirect to home otherwise display the checkout
        // and compoentData component
        let summary = <Redirect to="/" />;
        if (this.props.ingredients) {
            //redirecting after purchase completion
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ingredients}
                    />
                    {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData} /> */}

                    {/* Passing the ingredients data from the ContactData from */}
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    // render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
                    />
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);