import axios from 'axios';
import { store, persistor } from '../app/store'; 
import { removeUser } from '../features/user/userSlice';

const prod_url = import.meta.env.VITE_BASE_URL_PROD;
const workMode = import.meta.env.VITE_MODE;
const local_url = import.meta.env.VITE_BASE_URL_DEV;
const BASE_URL = workMode === "production" ? prod_url : local_url;

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    timeout: 10000  
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            store.dispatch(removeUser());
            // persistor.purge();
        }
        return Promise.reject(error);
    }
);

export default api;