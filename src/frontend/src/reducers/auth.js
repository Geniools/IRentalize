import {
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    REFRESH_TOKEN_FAIL,
    REFRESH_TOKEN_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
} from "../actions/types";

const initialState = {
    access: sessionStorage.getItem("access") || localStorage.getItem("access"),
    refresh: sessionStorage.getItem("refresh") || localStorage.getItem("refresh"),
    isAuthenticated: null,
    user: null,
}

export default function (state = initialState, action) {
    const {type, payload, remember} = action;

    switch (type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
            }
        case REFRESH_TOKEN_SUCCESS:
        case LOGIN_SUCCESS:
            if (remember) {
                localStorage.setItem("access", payload.access);
                localStorage.setItem("refresh", payload.refresh);
            } else {
                sessionStorage.setItem("access", payload.access);
                sessionStorage.setItem("refresh", payload.refresh);
            }
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            }
        case UPDATE_USER_SUCCESS:
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload,
            }
        case REFRESH_TOKEN_FAIL:
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            sessionStorage.removeItem("access");
            sessionStorage.removeItem("refresh");
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
            }
        case UPDATE_USER_REQUEST:
        case UPDATE_USER_FAILURE:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    }
}

