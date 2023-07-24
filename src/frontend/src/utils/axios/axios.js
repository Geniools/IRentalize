import axios from "axios";
import store from "../store/store";
import {refreshToken} from "../../actions/auth";

const axiosAuthInstanceAPI = axios.create();

// Response interceptor for API calls to refresh the token
axiosAuthInstanceAPI.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            await store.dispatch(refreshToken());

            originalRequest.headers['Authorization'] = `JWT ${localStorage.getItem("access") || sessionStorage.getItem("access")}`;
            return axiosAuthInstanceAPI(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default axiosAuthInstanceAPI;