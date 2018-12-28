import {CHANGE_FILTER_VALUE, RESET_FILTERS} from "../actions/filters";
import {DEFAULT_FILTERS} from "../components/homepage/filterConstants";
import {each} from "lodash";


export function filtersReducer(state={}, action) {
    switch (action.type) {
        case CHANGE_FILTER_VALUE + '_SUCCEEDED':
            return Object.assign({}, state, {
                body: getBody(action, state),
                convention: changeFilterValueReducer(state.convention, action, 'convention'),
                section: changeFilterValueReducer(state.section, action, 'section'),
                submitters: changeFilterValueReducer(state.submitters, action, 'submitters'),
                status: changeFilterValueReducer(state.status, action, 'status'),
                referred: changeFilterValueReducer(state.referred, action, 'referred')
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


function changeFilterValueReducer(state, action, label) {
    switch (action.type) {
        case CHANGE_FILTER_VALUE + '_SUCCEEDED':
            const {section, name} = action.payload;
            if (section === label) {
                const newState = Object.assign({}, state);
                each(newState, (value, key) => {
                    console.log(value, key, name, key === name);
                    newState[key] = key === name;
                });
                return newState;
            }
            return state;
        default:
            return state;
    }
}