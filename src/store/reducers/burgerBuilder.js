import * as actionType from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 60,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 30,
    cheese: 25,
    meat: 60,
    bacon: 35
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionType.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        case actionType.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }

}

export default reducer;