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


//Redux Devtools implementation with redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//combining the reducers
const roodReducer = combineReducers({
    //these are the different state slices of different reducers
    // state = burgerBuilder , reducer - burgerBuilderReducer
    // state = order , reducer = orderReducer
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
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

