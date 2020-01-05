import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

        this.setState({ loading: true });
        const order = {
            Ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Ashutosh',
                address: {
                    street: '7th Main',
                    zipCode: '560075',
                    country: 'India'
                },
                email: 'ashu@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(response => {
            this.setState({ loading: false });
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            this.setState({ loading: false });
        });
    }
    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" id="" placeholder="Your Email" />
                <input className={classes.Input} type="text" name="street" id="" placeholder="Street" />
                <input className={classes.Input} type="text" name="postalCode" id="" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>Order </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;