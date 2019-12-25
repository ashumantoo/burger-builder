import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    /**====================================================================
     * The Ingredient data which is passed from the BurgerBuilder Component
     * is an Object, not an array so we need to transform into an array
     */
    let transformedIngredient = Object.keys(props.ingredients)
        .map(ingKey => {
            //ingkey = salad,bacon,cheese,meat
            return [...Array(props.ingredients[ingKey])].map((_, i) => {
                return <BurgerIngredient key={ingKey + i} type={ingKey} />;
            })
        })//reduce() execute on each element of the array , resulting in a single output value
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    if (transformedIngredient.length === 0) {
        transformedIngredient = <p>Please start adding Ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger;