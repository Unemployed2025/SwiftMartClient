import api from "./axiosConfig";

export const reviewExist = async (userid, furnitureid) => {
    const response = await api.get('/review/exist', {
        params: { userid, furnitureid }
    });
    return response;
}

export const createReview = async (userid, furnitureid, review, rating, title) => {
    const response = await api.post('/review/create', {
        byWhom: userid, forWhichFurniture: furnitureid, title, body: review, rating
    });
    return response;
}