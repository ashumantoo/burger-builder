import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

//axios instances for passing the any error which occurred due to the http request
//which handled globally by using the axios global instance.
const withErrorHandler = (WrappedComponent, axios) => {

    //anonymous class with name
    return class extends Component {

        state = {
            error: null
        }

        //we can use axios interceptor here which allow us to handle the http error
        //globally
        //CompoenntDidMount execute before the child component thus this will not able
        //to catch the error which occurred in the child component. to fix this
        // we should use componentWillMount() or constructor method.
        componentWillMount() {
            //on http request setting back error to null becoz on request we don't have error 
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            //setting error to the http response error if we have any
            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        //this will unmount the component from the memory once we moved on the different component or page
        //if we don't unmount the axios interceptors then this hoc will called for every component which wrapped this hoc
        //and this will lead to the error or some memory leaks because they always sits in the memory if we don;t
        //unmount this. 
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;