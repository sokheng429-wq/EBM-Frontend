import api from "./axiosConfig";

// Ask the backend to generate a Bakong KHQR code for this booking. The
// backend looks up the price itself (never trust a price typed in the
// browser), so we only need the booking id.
export const generateKhqr = (bookingId) => api.post(`/payments/khqr/${bookingId}`);

// Poll this while the QR is on screen - the backend checks Bakong's Open API
// and tells us whether the customer has paid yet.
export const checkKhqrStatus = (md5) => api.get(`/payments/khqr/status/${md5}`);

// Fetch the latest Payment row for a booking so the My Bookings page can
// show "PAID / PENDING / EXPIRED" next to each booking. Returns 404 (which
// the caller should treat as "no payment yet") if none exists.
export const getLatestPayment = (bookingId) =>
  api.get(`/payments/booking/${bookingId}`);
