import {
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    DELETE_USER_PROFILE_IMAGE_FAILURE,
    DELETE_USER_PROFILE_IMAGE_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    REFRESH_TOKEN_FAIL,
    REFRESH_TOKEN_SUCCESS,
    REMEMBER_ME,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_PROFILE_IMAGE_FAILURE,
    UPDATE_USER_PROFILE_IMAGE_SUCCESS,
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
    rememberMe: localStorage.getItem("rememberMe"),
}

export default function (state = initialState, action) {
    const {type, payload} = action;

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
        case REMEMBER_ME:
            // Set the remember me flag in the local storage
            localStorage.setItem("rememberMe", true);
            // Save the remember me flag in the state
            return {
                ...state,
                rememberMe: true,
            }
        case REFRESH_TOKEN_SUCCESS:
        case LOGIN_SUCCESS:
            // Reset the access and refresh tokens in the local storage
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            sessionStorage.removeItem("access");
            sessionStorage.removeItem("refresh");
            // Save the access and refresh tokens in the local storage or session storage
            if (state.rememberMe) {
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
        case UPDATE_USER_PROFILE_IMAGE_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    profile: {
                        ...state.user.profile,
                        profile_picture: payload.profile_picture,
                    }
                }
            }
        case DELETE_USER_PROFILE_IMAGE_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    profile: {
                        ...state.user.profile,
                        profile_picture: null,
                    }
                }
            }
        case REFRESH_TOKEN_FAIL:
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            // Reset the access and refresh tokens in the local storage
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            sessionStorage.removeItem("access");
            sessionStorage.removeItem("refresh");
            // Reset the remember me flag in the local storage
            localStorage.removeItem("rememberMe");
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                rememberMe: false,
                user: null,
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null,
            }
        case UPDATE_USER_REQUEST:
        case UPDATE_USER_FAILURE:
        case DELETE_USER_PROFILE_IMAGE_FAILURE:
        case UPDATE_USER_PROFILE_IMAGE_FAILURE:
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

