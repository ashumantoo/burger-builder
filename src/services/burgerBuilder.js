import axios from '../axios-orders';

export default {
    getIngredients: () => axios.get('https://burger-builder-3f9d5.firebaseio.com/ingredients.json'),
}