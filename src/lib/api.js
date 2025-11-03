import axios from 'axios'
const prod_url=import.meta.env.VITE_BASE_URL_PROD;
const workMode=import.meta.env.VITE_MODE;
const local_url=import.meta.env.VITE_BASE_URL_DEV;
const BASE_URL = workMode==="production" ? prod_url: local_url;

const api=axios.create({
    baseURL:BASE_URL,
    withCredentials:true
});
export default api;
