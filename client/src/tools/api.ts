import axios from "axios";
const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URI,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },  
});

export default api;
export const csrf = async () => await api.get("sanctum/csrf-cookie");