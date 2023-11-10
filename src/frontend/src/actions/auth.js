import axios from "axios";
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
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
    USERNAME_RESET_CONFIRM_FAIL,
    USERNAME_RESET_CONFIRM_SUCCESS,
    USERNAME_RESET_FAIL,
    USERNAME_RESET_SUCCESS,
} from "./types";
import axiosAuthInstanceAPI from "../utils/axios/axios";


export const refreshToken = () => async (dispatch, getState) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const refresh = getState().auth.refresh;
    const body = JSON.stringify({refresh});

    try {
        const res = await axios.post("/auth/jwt/refresh/", body, config);

        dispatch({
            type: REFRESH_TOKEN_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: REFRESH_TOKEN_FAIL,
        });
    }
}

export const checkAuthenticated = () => async (dispatch, getState) => {
    const accessToken = getState().auth.access;
    if (accessToken) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${accessToken}`,
                "Accept": "application/json",
            }
        }

        const body = JSON.stringify({token: accessToken});

        try {
            const res = await axios.post("/auth/jwt/verify/", body, config);

            if (res.data.code !== "token_not_valid") {
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL,
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL,
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL,
        });
    }
}

export const loadUser = () => async dispatch => {
    const config = {
        headers: {
            "Accept": "application/json",
        }
    }

    try {
        const res = await axiosAuthInstanceAPI.get("/auth/users/me/", config);

        dispatch({
            type: USER_LOADED_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: USER_LOADED_FAIL,
        });
    }
}

export const login = (email, password, rememberMe) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post("/auth/jwt/create/", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
            remember: rememberMe,
        });

        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
        });
    }
}

export const signup = (first_name, last_name, email, password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({first_name, last_name, email, password});

    try {
        const res = await axios.post("/auth/users/", body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL,
        });
    }
}

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({uid, token});

    try {
        const res = await axios.post("/auth/users/activation/", body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL,
        });
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT,
    });
}

// Password Reset

export const resetPassword = (email) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({email});
    try {
        const res = await axios.post("/auth/users/reset_password/", body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL,
        });
    }
}

export const resetPasswordConfirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({uid, token, new_password, re_new_password});

    try {
        const res = await axios.post("/auth/users/reset_password_confirm/", body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL,
        });
    }
}

// Email reset
export const resetEmail = (email) => async (dispatch, getState) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({email});

    try {
        const res = await axios.post("/auth/users/reset_email/", body, config);

        dispatch({
            type: USERNAME_RESET_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: USERNAME_RESET_FAIL,
        });
    }
    // }
}

export const resetEmailConfirm = (uid, token, new_email, re_new_email) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({uid, token, new_email, re_new_email});

    try {
        const res = await axios.post("/auth/users/reset_email_confirm/", body, config);

        dispatch({
            type: USERNAME_RESET_CONFIRM_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: USERNAME_RESET_CONFIRM_FAIL,
        });
    }
}