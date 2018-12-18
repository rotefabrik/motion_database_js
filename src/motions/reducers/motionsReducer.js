import {SEARCH_MOTIONS} from "../actions/motions";

export function motionsReducer(state = {}, action) {
    switch (action.type) {
        case SEARCH_MOTIONS + '_SUCCEEDED':
            return Object.assign({}, state, {'items': action.payload});
        default:
            return state;
    }
}
