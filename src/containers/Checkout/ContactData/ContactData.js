import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" id="" placeholder="Your Email" />
                    <input className={classes.Input} type="text" name="street" id="" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postalCode" id="" placeholder="Postal Code" />
                    <Button btnType="Success">Order </Button>
                </form>
            </div>
        );
    }
}

export default ContactData;