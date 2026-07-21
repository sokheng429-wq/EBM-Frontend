import api from "./axiosConfig";

// Public - list only active tours (used by the booking form dropdown).
export const getActiveTourPrices = () => api.get("/tour-prices");

// Admin - list every tour (active + inactive).
export const getAllTourPrices = () => api.get("/tour-prices/all");

// Admin - create a new tour price.
export const createTourPrice = (tourPrice) =>
  api.post("/tour-prices", tourPrice);

// Admin - update an existing tour price.
export const updateTourPrice = (id, tourPrice) =>
  api.put(`/tour-prices/${id}`, tourPrice);

// Admin - delete a tour price.
export const deleteTourPrice = (id) => api.delete(`/tour-prices/${id}`);