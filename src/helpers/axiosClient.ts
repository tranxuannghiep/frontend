import { AUTH } from "utils/constants";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const token = localStorage.getItem(AUTH)
const axiosClient = axios.create()
if (token) {
    axiosClient.defaults.headers.common["Authorization"] = "Bearer " + token;
} else {
    delete axiosClient.defaults.headers.common["Authorization"];
}

export const setAuthToken = (tokenLogin: string) => {
    if (tokenLogin) {
        axiosClient.defaults.headers.common["Authorization"] = "Bearer " + tokenLogin;
    } else {
        delete axiosClient.defaults.headers.common["Authorization"];
    }
};


// Add a request interceptor
axiosClient.interceptors.request.use(function (config: AxiosRequestConfig) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axiosClient