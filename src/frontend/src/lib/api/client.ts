import axios from 'axios'
import {getCsrfToken} from './getCsrfToken'


// API configuration
const baseConfig = {
    baseURL: '/api',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true,
}

// Create an axios instance
const apiClient = axios.create(baseConfig)

// Add a request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // TODO: Add token to request headers when implementing authentication
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Token ${token}`;
        // }
        const csrfToken = getCsrfToken();

        if (csrfToken) {
            config.headers['X-CSRFToken'] = csrfToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// Add a response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export {apiClient}