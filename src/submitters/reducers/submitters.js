import {FETCH_SUBMITTERS} from "../actions/submitters";

export function submittersReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_SUBMITTERS + '_SUCCEEDED':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
