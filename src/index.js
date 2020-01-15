import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';


//Redux Devtools implementation with redux store
//if app is in the development mode then only enable the redux state mode otherwise set it to null in production mode
//by using the process environment variable
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

//combining the reducers
const roodReducer = combineReducers({
    //these are the different state slices of different reducers
    // state = burgerBuilder , reducer - burgerBuilderReducer
    // state = order , reducer = orderReducer
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

//redux-thunk is a middleware to run asynchronous code
const store = createStore(roodReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

