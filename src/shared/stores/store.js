import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import {createLogger} from 'redux-logger'

import {motionReducer} from "../../motions/reducers/motionReducer";
import {motionsReducer} from '../../motions/reducers/motionsReducer';
import {configReducer} from "../reducers/configReducer";
import {filtersReducer} from "../../home/reducers/filters";


const logger = createLogger();


export const reducers = combineReducers({
    config: configReducer,
    filters: filtersReducer,

    motion: motionReducer,
    motions: motionsReducer,

    form: formReducer
});

export const mainStore = createStore(reducers, typeof window !== 'undefined' ? window.__STORE__ : null || {},
    applyMiddleware(thunk, logger));