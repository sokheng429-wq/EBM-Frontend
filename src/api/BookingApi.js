import api from "./axiosConfig";

// Create a booking. Works for guests and logged-in users alike -
// if a JWT is present, axiosConfig attaches it and the backend links
// the booking to that account automatically.
export const createBooking = (booking) => api.post("/bookings", booking);

// Logged-in user's own booking history
export const getMyBookings = () => api.get("/bookings/my");

// Admin - every booking in the system
export const getAllBookings = () => api.get("/bookings");

// Admin - a single booking
export const getBookingById = (id) => api.get(`/bookings/${id}`);

// Admin - update a booking's status, e.g. updateBookingStatus(3, "CONFIRMED")
export const updateBookingStatus = (id, status) =>
    api.put(`/bookings/${id}/status`, { status });

// Admin - delete a booking
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);
