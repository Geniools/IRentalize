import {
    ADD_POST_FAIL,
    ADD_POST_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    GET_LISTINGS_FAIL,
    GET_LISTINGS_SUCCESS,
    UPDATE_POST_FAIL,
    UPDATE_POST_SUCCESS
} from "./types";
import axiosAuthInstanceAPI from "../utils/axios/axios";

export const addListing = (title, description, category, price, address, images) => async (dispatch, getState) => {
    const accessToken = getState().auth.access;

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data; ',
            "Authorization": `JWT ${accessToken}`,
        }
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('address', address);

    // Append the images to the form data
    for (let i = 0; i < images.length; i++) {
        formData.append('uploaded_images', images[i]);
    }

    try {
        const res = await axiosAuthInstanceAPI.post('/api/user-listings/', formData, config);

        dispatch({
            type: ADD_POST_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: ADD_POST_FAIL,
        });
    }
}

export const updateListing = (id, title, description, category, price, address, images) => async (dispatch, getState) => {
    const accessToken = getState().auth.access;

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data; ',
            "Authorization": `JWT ${accessToken}`,
        }
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('address', address);

    // Append the images to the form data
    for (let i = 0; i < images.length; i++) {
        formData.append('uploaded_images', images[i]);
    }

    try {
        const res = await axiosAuthInstanceAPI.patch(`/api/user-listings/${id}/`, formData, config);

        dispatch({
            type: UPDATE_POST_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: UPDATE_POST_FAIL,
        });
    }
}

export const loadCategories = () => async (dispatch, getState) => {
    const accessToken = getState().auth.access;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `JWT ${accessToken}`,
        }
    }

    try {
        const res = await axiosAuthInstanceAPI.get('/api/categories/', config);

        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);

        dispatch({
            type: GET_CATEGORIES_FAIL,
        });
    }
}

export const loadListings = () => async (dispatch, getState) => {
    const accessToken = getState().auth.access;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `JWT ${accessToken}`,
        }
    }

    try {
        const res = await axiosAuthInstanceAPI.get('/api/listings/', config);

        dispatch({
            type: GET_LISTINGS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);

        dispatch({
            type: GET_LISTINGS_FAIL,
        });
    }
}

export const loadUserListings = () => async (dispatch, getState) => {
    const accessToken = getState().auth.access;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `JWT ${accessToken}`,
        }
    }

    try {
        const res = await axiosAuthInstanceAPI.get('/api/user-listings/', config);

        dispatch({
            type: GET_LISTINGS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);

        dispatch({
            type: GET_LISTINGS_FAIL,
        });
    }
}