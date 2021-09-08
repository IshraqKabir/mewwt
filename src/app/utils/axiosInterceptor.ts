import axios from "axios";
import { BACKEND_URL } from "../../../config/envs";
import { getToken } from "../repository/storage/getToken";

const headers = {};

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    headers: headers,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token: string = await getToken();

        if (token) {
            config.headers.Authorization = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
