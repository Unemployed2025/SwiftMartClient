import api from './axiosConfig';

export const getCart = async (id) => {
    const response = await api.get(`/user/${id}/cart`);
    return response;
}

export const addtocart = async (furnitureId, id) => {
    const response = await api.patch(`/user/${id}/addtocart`, { furnitureId });
    return response;

}
export const removefromcart = async (furnitureId, id) => {
    const response = await api.delete(`/user/${id}/removefromcart`, { furnitureId });
    return response;
}

export const emptycart = async (id) => {
    const response = await api.delete(`/user/${id}/emptycart`);
    return response;
}