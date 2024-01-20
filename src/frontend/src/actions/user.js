import axiosInstanceJSONAPI from "../services/axios/axios_content_type_json";
import axiosInstanceFormDataAPI from "../services/axios/axios_content_type_formdata";

import {
    DELETE_USER_PROFILE_IMAGE_FAILURE,
    DELETE_USER_PROFILE_IMAGE_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_PROFILE_IMAGE_FAILURE,
    UPDATE_USER_PROFILE_IMAGE_SUCCESS,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS
} from "./types";

export const updateUserInfo = (input) => async dispatch => {
    dispatch({
        type: UPDATE_USER_REQUEST,
    })

    const config = {
        headers: {
            "Accept": "application/json",
        }
    }

    const userDetails = {
        'username': input.username,
        'first_name': input.first_name,
        'last_name': input.last_name,
        'email': input.email,
        'profile': {
            'about_me': input.about_me,
            'phone': input.phone,
            'default_address': {
                'street_name': input.street_name,
                'house_number': input.house_number,
                'house_addition': input.house_addition,
                'zip_code': input.zip_code,
            }
        }
    }
    const body = JSON.stringify(userDetails);

    try {
        const res = await axiosInstanceJSONAPI.patch("/auth/users/me/", body, config);

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: UPDATE_USER_FAILURE,
        });
    }
}

export const updateUserProfilePicture = (profile_picture) => async dispatch => {
    dispatch({
        type: UPDATE_USER_REQUEST,
    })

    const body = new FormData();
    body.append('profile_picture', profile_picture);

    try {
        const res = await axiosInstanceFormDataAPI.patch("/api/user-profile-image/", body);

        dispatch({
            type: UPDATE_USER_PROFILE_IMAGE_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: UPDATE_USER_PROFILE_IMAGE_FAILURE,
        });
    }
}

export const deleteUserProfilePicture = () => async dispatch => {
    dispatch({
        type: UPDATE_USER_REQUEST,
    })

    try {
        const res = await axiosInstanceJSONAPI.delete("/api/user-profile-image/");

        dispatch({
            type: DELETE_USER_PROFILE_IMAGE_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: DELETE_USER_PROFILE_IMAGE_FAILURE,
        });
    }
}