import { createActionThunk } from 'redux-thunk-actions';
import API from "../../shared/api/api";


export const URL_SEARCH_MOTIONS = '/motions/';
export const SEARCH_MOTIONS = 'SEARCH_MOTIONS';
export const searchMotions = (query) => {
    return (dispatch) => {
        let action = createActionThunk(SEARCH_MOTIONS, () => new API().get(
            URL_SEARCH_MOTIONS, {search: JSON.stringify(query)}));
        let promise = dispatch(action());
        promise.then(data => data, error => error);
    };
};