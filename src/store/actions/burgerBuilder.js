import * as actionTypes from './actionTypes';
import burgerBuilderService from '../../services/burgerBuilder';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

// export const setIngredients = (ingredients) => {
//     return {
//         type: actionTypes.SET_INGREDIENTS,
//         ingredients: ingredients
//     }
// }

// export const fetchIngredientsFailed = () => {
//     return {
//         type: actionTypes.FETCH_INGREDIENTS_FAILED
//     }
// }

// export const initIngredients = () => {
//     return dispatch => {
//         axios.get('https://burger-builder-3f9d5.firebaseio.com/ingredients.json')
//             .then(response => {
//                 dispatch(setIngredients(response.data));
//             }).catch(error => {
//                 dispatch(fetchIngredientsFailed());
//             });
//     }
// }

export const initIngredients = () => dispatch => {
    return burgerBuilderService.getIngredients()
        .then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => {
            dispatch(fetchIngredientsFailed());
        });

    function setIngredients(ingredients) { return { type: actionTypes.SET_INGREDIENTS, ingredients } }
    function fetchIngredientsFailed() { return { type: actionTypes.FETCH_INGREDIENTS_FAILED } }
}