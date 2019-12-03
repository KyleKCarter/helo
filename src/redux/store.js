import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';

//reducers
import authReducer from './authReducer';

const root = combineReducers ({
    authReducer
})

export default createStore(root, applyMiddleware(promise));