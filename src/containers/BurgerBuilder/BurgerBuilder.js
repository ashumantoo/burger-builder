import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {

    //We can also create state using the constructor but we need to always
    //call the super() inside the constructor
    // constructor(props){
    //     super(props);
    //     this.state = {...};
    // }

    //creating the ingredients data using the state
    state = {
        purchasing: false,
    }

    //A good place to fetch the data from api
    componentDidMount() {
        // axios.get('https://burger-builder-3f9d5.firebaseio.com/ingredients.json')
        //     .then(res => {
        //         this.setState({ ingredients: res.data });
        //     }).catch(error => {
        //         this.setState({ error: error });
        //     });
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }
    //========================== This Pic of code was implemented before the redux implementation ========================
    //On Addition on Ingredients updating the price as well updating the ingredients
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // purchaseContinueHandler = () => {
    //     //Passing ingredients from the query params
    //     const queryParams = [];
    //     for (const i in this.state.ingredients) {
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    //     }
    //     queryParams.push('price=' + this.state.totalPrice);
    //     const queryString = queryParams.join('&');
    //     this.props.history.push({
    //         pathname: '/checkout',
    //         search: '?' + queryString
    //     });
    // }
    //=====================================================================================================================

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //onInitPurchase() redirect after completing the purchase
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }


    render() {
        const disabledInfo = {
            // ...this.state.ingredients
            ...this.props.ingredients
        };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        // ingredientAdded={this.addIngredientHandler}
                        // ingredientRemove={this.removeIngredientHandler}
                        // purchasable={this.state.purchasable}
                        ingredientAdded={this.props.onIngredientsAdded}
                        ingredientRemove={this.props.onIngredientsRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        price={this.props.totalPrice}
                        isAuth={this.props.isAuthenticated}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.totalPrice} />;
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

const mapStateToProps = state => {
    return {
        //burgerBuilder a slice of state from root reducer state
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //Without using the action creators
        // onIngredientsAdded: (ingName) => dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
        // onIngredientsRemoved: (ingName) => dispatch({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName })

        //using the action creators
        onIngredientsAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientsRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

//withErrorHandler is hoc which handles any error which occurred in app 
//This is a higher order component which sits top of any component.
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));