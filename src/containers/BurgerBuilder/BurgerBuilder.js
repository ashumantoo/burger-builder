import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    //We can also create state using the constructor but we need to always
    //call the super() inside the constructor
    // constructor(props){
    //     super(props);
    //     this.state = {...};
    // }

    //creating the ingredients data using the state
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }
    }

    render() {
        return (
            <Aux>
                {/**Passing ingredient data to the Burger component */}
                <Burger ingredients={this.state.ingredients} />
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;