import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 30,
    cheese: 25,
    meat: 60,
    bacon: 35
}
class BurgerBuilder extends Component {

    //We can also create state using the constructor but we need to always
    //call the super() inside the constructor
    // constructor(props){
    //     super(props);
    //     this.state = {...};
    // }

    //creating the ingredients data using the state
    state = {
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        ingredients: null,
        totalPrice: 60,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    //A good place to fetch the data from api
    componentDidMount() {
        axios.get('https://burger-builder-3f9d5.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data });
            }).catch(error => {
                this.setState({ error: error });
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 })
    }
    //On Addition on Ingredients updating the price as well updating the ingredients
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');
        // // this.purchaseCancelHandler();
        // this.setState({ loading: true });
        // const order = {
        //     Ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Ashutosh',
        //         address: {
        //             street: '7th Main',
        //             zipCode: '560075',
        //             country: 'India'
        //         },
        //         email: 'ashu@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order).then(response => {
        //     this.setState({ loading: false, purchasing: false });
        // }).catch(error => {
        //     console.log(error);
        //     this.setState({ loading: false, purchasing: false });
        // });

        //Passing ingredients from the query params
        const queryParams = [];
        for (const i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    {/**Passing ingredient data to the Burger component */}
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {/** - This OrderSummary Component always render event if we are not opening 
                     *     the modal, and this reduce the app performance.
                     * 
                     *   - So this OrderSummary Component should only render on the dom if the model
                     *     is open otherwise it should not be render on the dom.
                     *  
                     *   - For this we should restrict the OrderSummary component to render by putting 
                     *     a condition on the Model Component using shouldComponentUpdate() life Cycle 
                     *     hook of the React component.  
                     */}
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

//withErrorHandler is hoc which handles any error which occurred in app 
//This is a higher order component which sits top of any component.
export default withErrorHandler(BurgerBuilder, axios);