import { createActionThunk } from 'redux-thunk-actions';


export const CHANGE_FILTER_VALUE = 'CHANGE_FILTER_VALUE';
export const changeFilterValue = (section, name, value) => {
    return (dispatch) => {
        const data = {section, name, value};
        let action = createActionThunk(CHANGE_FILTER_VALUE, () => data);
        dispatch(action());
    };
};
