import {ADD_POST_FAIL, ADD_POST_SUCCESS, GET_CATEGORIES_FAIL, GET_CATEGORIES_SUCCESS, GET_LISTINGS_FAIL, GET_LISTINGS_SUCCESS} from "./types";
import axiosAuthInstanceAPI from "../utils/axios/axios";

export const addPost = (title, description, price, address) => async (dispatch, getState) => {
    const accessToken = getState().auth.access;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `JWT ${accessToken}`,
        }
    }

    const body = JSON.stringify({title, description, price, address});

    try {
        const res = await axiosAuthInstanceAPI.post('/api/listings/', body, config);

        dispatch({
            type: ADD_POST_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: ADD_POST_FAIL,
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