import {RETRIEVE_MOTIONS} from "../actions/motions";

export function motionsReducer(state = {}, action) {
    switch (action.type) {
        case RETRIEVE_MOTIONS + '_SUCCEEDED':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
