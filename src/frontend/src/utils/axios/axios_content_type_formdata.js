import axios from "axios";
import store from "../store/store";
import {refreshToken} from "../../actions/auth";

const axiosInstanceFormDataAPI = axios.create();


// Request interceptor for API calls to add the access token header to the request
axiosInstanceFormDataAPI.interceptors.request.use(
    async config => {
        const access = localStorage.getItem("access") || sessionStorage.getItem("access");

        if (access) {
            config.headers['Authorization'] = `JWT ${access}`;
        }

        if (!config.headers['Content-Type']) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

// Response interceptor for API calls to refresh the token
axiosInstanceFormDataAPI.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            await store.dispatch(refreshToken());

            originalRequest.headers['Authorization'] = `JWT ${localStorage.getItem("access") || sessionStorage.getItem("access")}`;
            return axiosInstanceFormDataAPI(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default axiosInstanceFormDataAPI;