import {RETRIEVE_MOTION} from "../actions/motions";


export function motionReducer(state = {}, action) {
    switch (action.type) {
        case RETRIEVE_MOTION + '_STARTED':
            return {};
        case RETRIEVE_MOTION + '_SUCCEEDED':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
