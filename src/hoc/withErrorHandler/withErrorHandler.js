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
        componentDidMount() {
            //on http request setting back error to null becoz on request we don't have error 
            axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })

            //setting error to the http response error if we have any
            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
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