import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: "Cheapest" }
                    ]
                },
                value: '',
                validation: {},
                valid: false
            }
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            Ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        this.props.onOrderBurger(order, this.props.token);
        // axios.post('/orders.json', order).then(response => {
        //     this.setState({ loading: false });
        //     this.props.history.push('/');
        // }).catch(error => {
        //     console.log(error);
        //     this.setState({ loading: false });
        // });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    inputChangedHandler = (event, inputIdentifer) => {
        // console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        //Deep cloning of the order form object (nested object mutation)
        //not change the original one
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifer]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifer] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            //key === name,street,zipCode etc
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
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order </Button>
            </form>
        );
        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));