import api from "./axiosConfig";

// POST /api/auth/login -> { token, user }
export const login = (credentials) => api.post("/auth/login", credentials);

// POST /api/auth/register -> { token, user }
export const register = (payload) => api.post("/auth/register", payload);

// GET /api/auth/me -> current user (requires a valid token)
export const getMe = () => api.get("/auth/me");
