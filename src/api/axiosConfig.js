import axios from "axios";

const api = axios.create({
    baseURL: "https://ebm-backend-1.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = token.startsWith("Basic ")
            ? token
            : `Bearer ${token}`;
    }

    return config;
});

export default api;