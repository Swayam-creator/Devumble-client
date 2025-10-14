import axios from 'axios'
const BASE_URL =  import.meta.env.VITE_BASE_URL_DEV;

const api=axios.create({
    baseURL:BASE_URL,
    withCredentials:true
});
export default api;
