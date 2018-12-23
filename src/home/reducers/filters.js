import {CHANGE_FILTER_VALUE} from "../actions/filters";


export function filtersReducer(state={}, action) {
    switch (action.type) {
        case CHANGE_FILTER_VALUE + '_SUCCEEDED':
            return Object.assign({}, state, {
                convention: conventionReducer(state.convention, action),
                section: sectionReducer(state.section, action),
                submitters: submittersReducer(state.submitters, action),
                status: statusReducer(state.status, action)
            });
        default:
            return state;
    }
}


export function sectionReducer(state = {}, action) {
    switch (action.type) {
        case CHANGE_FILTER_VALUE + '_SUCCEEDED':
            const {section, name, value} = action.payload;
            if (section === 'section') {
                const updatedValue = {};
                updatedValue[name] = value;
                return Object.assign({}, state, updatedValue);
            }
            return state;
        default:
            return state;
    }
}


export function conventionReducer(state = {}, action) {
    switch (action.type) {
        case CHANGE_FILTER_VALUE + '_SUCCEEDED':
            const {section, name, value} = action.payload;
            if (section === 'convention') {
                const updatedValue = {};
                updatedValue[name] = value;
                return Object.assign({}, state, updatedValue);
            }
            return state;
        default:
            return state;
    }
}


export function submittersReducer(state = {}, action) {
    switch (action.type) {
        case CHANGE_FILTER_VALUE + '_SUCCEEDED':
            const {section, name, value} = action.payload;
            if (section === 'submitters') {
                const updatedValue = {};
                updatedValue[name] = value;
                return Object.assign({}, state, updatedValue);
            }
            return state;
        default:
            return state;
    }
}


export function statusReducer(state = {}, action) {
    switch (action.type) {
        case CHANGE_FILTER_VALUE + '_SUCCEEDED':
            const {section, name, value} = action.payload;
            if (section === 'status') {
                const updatedValue = {};
                updatedValue[name] = value;
                return Object.assign({}, state, updatedValue);
            }
            return state;
        default:
            return state;
    }
}