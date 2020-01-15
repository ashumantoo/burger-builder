import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
}

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: false });
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    })
}

const purchaseBurgerFailed = (state, action) => {
    return updateObject(state, { loading: false });
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, { orders: action.orders, loading: false });
}

const fetchOrderFailed = (state, action) => {
    return updateObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Burger Purchase redux actions
        case actionType.PURCHASE_INIT: return purchaseInit(state, action);
        case actionType.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionType.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionType.PURCHASE_BURGER_FAIL: return purchaseBurgerFailed(state, action);

        //Orders redux actions
        case actionType.FETCH_ORDERS_START: return fetchOrderStart(state, action);
        case actionType.FETCH_ORDERS_SUCCESS: return fetchOrderSuccess(state, action);
        case actionType.FETCH_ORDERS_FAIL: return fetchOrderFailed(state, action);
        default: return state;
    }
}

export default reducer;