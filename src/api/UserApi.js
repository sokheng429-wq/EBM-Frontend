import api from "./axiosConfig";

// GET all users
export const getUsers = () => {
    return api.get("/users");
};

// CREATE user
export const createUser = (user) => {
    return api.post("/users", user);
};

// GET user by id
export const getUserById = (id) => {
    return api.get(`/users/${id}`);
};

// UPDATE user
export const updateUser = (id, user) => {
    return api.put(`/users/${id}`, user);
};

// DELETE user
export const deleteUser = (id) => {
    return api.delete(`/users/${id}`);
};