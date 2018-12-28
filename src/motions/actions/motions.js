import { createActionThunk } from 'redux-thunk-actions';
import API from "../../shared/api/api";

export const URL_MOTIONS_ENDPOINT = '/motions/';


export const RETRIEVE_MOTIONS = 'RETRIEVE_MOTIONS';
export const searchMotions = (query, page, pageItems) => {
    return (dispatch) => {
        let action = createActionThunk(RETRIEVE_MOTIONS, () => retrieveMotionsFromAPI(query, page, pageItems));
        let promise = dispatch(action());
        promise.then(data => data, error => error);
    };
};


export const URL_RETRIEVE_MOTIONS = URL_MOTIONS_ENDPOINT;
export const retrieveMotionsFromAPI = (query, page, pageItems) => {
    return new API().get(URL_RETRIEVE_MOTIONS, {search: JSON.stringify(query), page: page, pageItems: pageItems})
}


export const RETRIEVE_MOTION = 'RETRIEVE_MOTION';
export const retrieveMotion = (id) => {
    return (dispatch) => {
        let action = createActionThunk(RETRIEVE_MOTION, () => retrieveMotionFromAPI(id));
        let promise = dispatch(action());
        promise.then(data => data, error => error);
    }
};


export const retrieveMotionFromAPI = (id) => {
    return new API().get(URL_MOTIONS_ENDPOINT + id, {});
};
