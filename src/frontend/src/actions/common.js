import {SET_NAVIGATE_TO_AFTER_AUTH} from "./types";

export const setNavigateToAfterAuth = (navigateTo) => async dispatch => {
    dispatch({
        type: SET_NAVIGATE_TO_AFTER_AUTH,
        payload: navigateTo,
    });
}