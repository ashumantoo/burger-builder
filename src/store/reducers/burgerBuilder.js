import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';
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
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            //     },
            //     totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            // }
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState);
        case actionType.REMOVE_INGREDIENT:
            // return {
            //     ...state,
            //     ingredients: {
            //         ...state.ingredients,
            //         [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            //     },
            //     totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            // }
            const updated_Ingredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updated_Ingredients = updateObject(state.ingredients, updated_Ingredient);
            const updated_State = {
                ingredients: updated_Ingredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updated_State);
        case actionType.SET_INGREDIENTS:
            // return {
            //     ...state,
            //     ingredients: action.ingredients,
            //     totalPrice: 60,
            //     error: false
            // };
            return updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 60,
                error: false
            })

        case actionType.FETCH_INGREDIENTS_FAILED:
            // return {
            //     ...state,
            //     error: true
            // }
            return updateObject(state, { error: true });
        default:
            return state;
    }

}

export default reducer;