import { createActionThunk } from 'redux-thunk-actions';


export const CHANGE_FILTER_VALUE = 'CHANGE_FILTER_VALUE';
export const changeFilterValue = (section, name) => {
    return (dispatch) => {
        const data = {section, name};
        let action = createActionThunk(CHANGE_FILTER_VALUE, () => data);
        dispatch(action());
    };
};


export const RESET_FILTERS = "RESET_FILTERS";
export const resetFilters = () => {
    return (dispatch) => {
        let action = createActionThunk(RESET_FILTERS, () => null);
        dispatch(action());
    };
};
