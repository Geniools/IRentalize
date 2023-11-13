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
import axiosInstanceJSONAPI from "../utils/axios/axios_content_type_json";
import axiosInstanceFormDataAPI from "../utils/axios/axios_content_type_formdata";
import axios from "axios";

export const addListing = ({formData, formImages}) => async dispatch => {
    const body = new FormData();
    body.append('title', formData.title);
    body.append('description', formData.description);
    body.append('category', formData.category);
    body.append('price', formData.price);
    // Address
    body.append('street_name', formData.street_name);
    body.append('zip_code', formData.zip_code);
    body.append('house_number', formData.house_number);
    body.append('house_addition', formData.house_addition);

    // Append the images to the form data
    for (let i = 0; i < formImages.length; i++) {
        body.append('uploaded_images', formImages[i]);
    }

    try {
        const res = await axiosInstanceFormDataAPI.post('/api/user-listings/', body);

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

export const updateListing = ({listingId, formData, formImages}) => async dispatch => {
    const body = new FormData();
    body.append('title', formData.title);
    body.append('description', formData.description);
    body.append('category', formData.category);
    body.append('price', formData.price);
    // Address
    body.append('street_name', formData.street_name);
    body.append('zip_code', formData.zip_code);
    body.append('house_number', formData.house_number);
    body.append('house_addition', formData.house_addition);

    // Append the images to the form data
    for (let i = 0; i < formImages.length; i++) {
        body.append('uploaded_images', formImages[i]);
    }

    try {
        const res = await axiosInstanceFormDataAPI.patch(`/api/user-listings/${listingId}/`, body);

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
        const res = await axiosInstanceJSONAPI.get('/api/categories/');

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
    // Define the headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };

    // Add the filters to the url
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

    // Send the request
    try {
        const res = await axios.get(url, config);

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
        const res = await axiosInstanceJSONAPI.get('/api/user-listings/');

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