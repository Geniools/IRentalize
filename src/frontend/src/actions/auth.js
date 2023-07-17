import axios from "axios";
import {
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
} from "./types";

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json",
            }
        }

        const body = JSON.stringify({token: localStorage.getItem("access")});

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

export const load_user = () => async dispatch => {
    if (localStorage.getItem("access")) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${localStorage.getItem("access")}`,
                "Accept": "application/json",
            }
        }

        try {
            const res = await axios.get("/auth/users/me/", config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL,
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL,
        });
    }
}

export const login = (email, password) => async dispatch => {
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
            payload: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
        });
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT,
    });
}

// Password Reset

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({email});

    try {
        const res = await axios.post("/auth/users/reset_password/", body, config);

        console.log(res);

        dispatch({
            type: PASSWORD_RESET_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL,
        });
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify({uid, token, new_password, re_new_password});

    try {
        const res = await axios.post("/auth/users/reset_password_confirm/", body, config);

        console.log(res);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
        });
    } catch (err) {
        console.log(err);
        
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL,
        });
    }
}