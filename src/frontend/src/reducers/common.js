import {ADD_ERROR, REMOVE_ERROR, SET_NAVIGATE_TO_AFTER_AUTH} from '../actions/types';

const initialState = {
    errors: [],
    navigateToAfterLogin: null,
}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case ADD_ERROR:
            return {
                ...state,
                errors: [...state.errors, payload],
            }
        case REMOVE_ERROR:
            return {
                ...state,
                errors: state.errors.filter((error) => error !== payload),
            }
        case SET_NAVIGATE_TO_AFTER_AUTH:
            return {
                ...state,
                navigateToAfterLogin: payload,
            }
        default:
            return state;
    }
}