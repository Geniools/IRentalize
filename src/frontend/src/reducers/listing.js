import {
    ADD_POST_FAIL,
    ADD_POST_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    GET_LISTINGS_FAIL,
    GET_LISTINGS_SUCCESS,
    UPDATE_POST_FAIL,
    UPDATE_POST_SUCCESS
} from "../actions/types";

const initialState = {
    listings: [],
    categories: [],
}

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case UPDATE_POST_SUCCESS:
        case ADD_POST_SUCCESS:
            return {
                ...state,
                listings: [...state.listings, payload],
            }
        case UPDATE_POST_FAIL:
        case ADD_POST_FAIL:
            return {
                ...state,
            }
        case GET_LISTINGS_SUCCESS:
            return {
                ...state,
                listings: payload,
            }
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload,
            }
        case GET_LISTINGS_FAIL:
            return {
                ...state,
                listings: [],
            }
        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                categories: [],
            }
        default:
            return state;
    }
}