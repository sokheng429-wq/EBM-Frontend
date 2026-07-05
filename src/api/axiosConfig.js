import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://ebm-backend.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

// attach JWT token to every request, if we have one
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// if the backend says our token is invalid/expired, clear it so the
// rest of the app knows we're logged out
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        return Promise.reject(error);
    }
);

export default api;
