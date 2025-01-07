import api from "./axiosConfig";

export const login = async (name, password) => {
    const response = await api.post(`/user/login`, { name, password });
    return response;

};

export const register = async (email, name, password) => {
    const response = await api.post(`/user/register`, { email, name, password });
    return response;

};

export const logout = async () => {
    const response = await api.post(`/user/logout`);
    return response;
};
export const byid = async (id) => {
    const response = await api.get(`/user/${id}`);
    return response;
};

export const getuserid = async () => {
    const response = await api.get(`/user/currentuserid`);
    return response;
};

export const getboughtfurniture = async (id) => {
    const response = await api.get(`/user/${id}/boughtfurniture`);
    return response;
}

export const getReviews = async (id) => {
    const response = await api.get(`/user/${id}/getreviews`);
    return response;
}

export const addboughtfurnitures = async (id, furnitureId) => {
    const response = await api.patch(`/user/${id}/addboughtfurniture`, { furnitureId });
    console.log(response);
    return response;
}

export const addReviewUser = async (uid, rid) => {
    const response = await api.patch(`/user/${uid}/addreview`, { reviewId: rid });
    return response;
}

export const getlistedfurniture = async (id) => {
    const response = await api.get(`/user/${id}/listedfurniture`);
    return response;
}

export const addListedFurniture = async (id, furnitureId) => {
    const response = await api.patch(`/user/${id}/addnewfurniture`, { furnitureId });
    console.log(response.data);
    return response;
}