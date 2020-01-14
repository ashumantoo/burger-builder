import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    ingredients: null,
    totalPrice: 60,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 30,
    cheese: 25,
    meat: 60,
    bacon: 35
}

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const updated_Ingredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updated_Ingredients = updateObject(state.ingredients, updated_Ingredient);
    const updated_State = {
        ingredients: updated_Ingredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state, updated_State);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 60,
        error: false,
        building: false
    })
}

const fetchIngredientFailed = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT: return addIngredient(state, action);
        case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionType.SET_INGREDIENTS: return setIngredients(state, action);
        case actionType.FETCH_INGREDIENTS_FAILED: return fetchIngredientFailed(state, action);
        default: return state;
    }
}

export default reducer;