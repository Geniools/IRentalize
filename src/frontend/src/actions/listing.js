import {
    ADD_POST_FAIL,
    ADD_POST_SUCCESS,
    GET_CATEGORIES_FAIL,
    GET_CATEGORIES_SUCCESS,
    GET_LISTINGS_FAIL,
    GET_LISTINGS_SUCCESS,
    GET_USER_LISTINGS_SUCCESS,
    UPDATE_POST_FAIL,
    UPDATE_POST_SUCCESS
} from "./types";
import axiosAuthInstanceAPI from "../utils/axios/axios";

export const addListing = (title, description, category, price, address, images) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data; ',
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

export const updateListing = (id, title, description, category, price, address, images) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data; ',
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

export const loadCategories = () => async dispatch => {
    try {
        const res = await axiosAuthInstanceAPI.get('/api/categories/');

        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_CATEGORIES_FAIL,
        });
    }
}

export const loadListings = ({url = "/api/listings/", filters}) => async dispatch => {
    if (filters) {
        let queryParams = "";

        for (const key in filters) {
            if (filters[key] !== "") {
                queryParams += `${key}=${filters[key]}&`;
            }
        }

        if (queryParams !== "") {
            url = `${url}?${queryParams.slice(0, -1)}`;
        }
    }

    try {
        const res = await axiosAuthInstanceAPI.get(url);

        dispatch({
            type: GET_LISTINGS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_LISTINGS_FAIL,
        });
    }
}

export const loadUserListings = () => async dispatch => {
    try {
        const res = await axiosAuthInstanceAPI.get('/api/user-listings/');

        dispatch({
            type: GET_USER_LISTINGS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: GET_LISTINGS_FAIL,
        });
    }
}