import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../shared/formValidation';

import classes from './Auth.module.css';

class Auth extends Component {
    state = {
        LoginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }
    onInputChangeHandler = (event, inputIdentifier) => {
        // const updatedLoginForm = {
        //     ...this.state.LoginForm
        // }
        // const updatedLoginFormElement = {
        //     ...updatedLoginForm[inputIdentifier]
        // }
        // updatedLoginFormElement.value = event.target.value;
        // updatedLoginFormElement.valid = this.checkValidity(updatedLoginFormElement.value, updatedLoginFormElement.validation);
        // updatedLoginFormElement.touched = true;
        // updatedLoginForm[inputIdentifier] = updatedLoginFormElement;
        // this.setState({ LoginForm: updatedLoginForm });

        const updatedLoginForm = {
            ...this.state.LoginForm,
            [inputIdentifier]: {
                ...this.state.LoginForm[inputIdentifier],
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.LoginForm[inputIdentifier].validation),
                touched: true
            }
        };
        this.setState({ LoginForm: updatedLoginForm });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.LoginForm.email.value, this.state.LoginForm.password.value, this.state.isSignUp);
    }

    switchAuthHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }

    render() {
        let loginFormArray = [];
        for (const key in this.state.LoginForm) {
            loginFormArray.push({
                id: key,
                config: this.state.LoginForm[key]
            })
        }
        let form = (
            <form onSubmit={this.submitHandler}>
                {loginFormArray.map(formElement => {
                    return <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.onInputChangeHandler(event, formElement.id)}
                    />
                })}
                <Button btnType="Success">Submit</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <p>
                    {this.props.error.message}
                </p>
            )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
                <Button btnType="Danger" clicked={this.switchAuthHandler}>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

