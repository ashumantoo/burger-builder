import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: "Cheapest" }
                    ]
                },
                value: ''
            }
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
        }
        axios.post('/orders.json', order).then(response => {
            this.setState({ loading: false });
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            this.setState({ loading: false });
        });
    }

    inputChangedHandler = (event, inputIdentifer) => {
        console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        //Deep cloning of the order form object (nested object mutation)
        //not change the original one
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifer]
        };

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifer] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            // <form>
            //     <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
            //     <Input inputtype="input" type="email" name="email" id="" placeholder="Your Email" />
            //     <Input inputtype="input" type="text" name="street" id="" placeholder="Street" />
            //     <Input inputtype="input" type="text" name="postalCode" id="" placeholder="Postal Code" />
            //     <Button btnType="Success" clicked={this.orderHandler}>Order </Button>
            // </form>
            <form>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
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