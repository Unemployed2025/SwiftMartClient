import api from './axiosConfig';

export const getCart = async () => {

    const response = await api.get('/cart');
    return response;

}

export const addtocart = async (productid) => {

    const response = await api.post('/cart', { productid });
    return response;

}
export const removefromcart = async (productid) => {
    const response = await api.delete('/cart', {
        data: { productid }
    });
    return response;
}

export const emptycart = async () => {
    const response = await api.delete('/cart/empty');
    return response;
}