import api from "./axiosConfig";

export const login = (credentials) => {
    const basicToken = `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`;

    return api.get("/auth/me", {
        headers: {
            Authorization: basicToken,
        },
    }).then((response) => ({
        ...response,
        data: {
            token: basicToken,
            user: response.data,
        },
    }));
};
