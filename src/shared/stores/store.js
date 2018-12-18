import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import {createLogger} from 'redux-logger'

import {motionsReducer} from '../../motions/reducers/motionsReducer';
import {configReducer} from "../reducers/configReducer";


const logger = createLogger();


export const reducers = combineReducers({
    config: configReducer,
    motions: motionsReducer,

    form: formReducer
});

export const mainStore = createStore(reducers, typeof window !== 'undefined' ? window.__STORE__ : null || {},
    applyMiddleware(thunk, logger));