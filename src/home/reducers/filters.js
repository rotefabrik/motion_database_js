import {CHANGE_FILTER_VALUE, RESET_FILTERS} from "../actions/filters";
import {DEFAULT_FILTERS} from "../components/homepage/filterConstants";


export function filtersReducer(state={}, action) {
    switch (action.type) {
        case CHANGE_FILTER_VALUE + '_SUCCEEDED':
            return Object.assign({}, state, {
                body: getBody(action, state),
                convention: conventionReducer(state.convention, action),
                section: sectionReducer(state.section, action),
                submitters: submittersReducer(state.submitters, action),
                status: statusReducer(state.status, action),
                referred: referredReducer(state.referred, action)
            });
        case RESET_FILTERS + '_SUCCEEDED':
            return Object.assign({}, DEFAULT_FILTERS);
        default:
            return state;
    }
}


function getBody(action, state) {
    if (!action.payload || !action.payload.section || action.payload.section !== 'body') {
        return state.body;
    }
    return action.payload.name;
}


export function sectionReducer(state={}, action) {
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


export function conventionReducer(state={}, action) {
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


export function submittersReducer(state={}, action) {
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


export function statusReducer(state={}, action) {
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


export function referredReducer(state={}, action) {
    switch (action.type) {
        case CHANGE_FILTER_VALUE + '_SUCCEEDED':
            const {section, name, value} = action.payload;
            if (section === 'referred') {
                const updatedValue = {};
                updatedValue[name] = value;
                return Object.assign({}, state, updatedValue);
            }
            return state;
        default:
            return state;
    }
}
