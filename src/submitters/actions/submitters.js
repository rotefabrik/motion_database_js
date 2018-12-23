import { createActionThunk } from 'redux-thunk-actions';
import API from "../../shared/api/api";


export const URL_SUBMITTERS = '/submitters/';
export const FETCH_SUBMITTERS = 'SEARCH_MOTIONS';
export const fetchSubmitters = (query, page, pageItems) => {
    return (dispatch) => {
        let action = createActionThunk(FETCH_SUBMITTERS, () => new API().get(
            URL_SUBMITTERS, {search: JSON.stringify(query), page: page, pageItems: pageItems}));
        let promise = dispatch(action());
        promise.then(data => data, error => error);
    };
};
