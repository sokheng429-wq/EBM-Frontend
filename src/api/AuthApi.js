import api from "./axiosConfig";

// POST /api/auth/login -> { token, user }
export const login = (credentials) => api.post("/auth/login", credentials);

// POST /api/auth/register -> { token, user }
export const register = (payload) => api.post("/auth/register", payload);

// GET /api/auth/me -> current user (requires a valid token)
export const getMe = () => api.get("/auth/me");

// POST /api/auth/forgot-password -> { message } (always 200, OTP emailed if account exists)
export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });

// POST /api/auth/verify-otp -> { message } (400 if invalid/expired)
export const verifyOtp = (email, otp) =>
  api.post("/auth/verify-otp", { email, otp });

// POST /api/auth/reset-password -> { message } (400 if not verified / expired)
export const resetPassword = (email, newPassword) =>
  api.post("/auth/reset-password", { email, newPassword });
