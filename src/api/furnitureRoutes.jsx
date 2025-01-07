import api from "./axiosConfig";

// Export functions
export const getAllFurniture = async () => {
    const response = await api.get("/furniture/all");
    return response;
};

export const getFurnitureById = async (id) => {
    const response = await api.get(`/furniture/${id}`);
    return response;
};

export const getReviewOfFurniture = async (id) => {
    const response = await api.get(`/furniture/${id}/reviews`);
    return response;
}

export const updateStockLeft = async (furnitureIds, stockLeft) => {
    const response = await api.patch(`/furniture/updatestock`, { furnitureIds, stockLeft });
    return response;
}

export const addReview = async (rid, fid) => {
    const response = await api.patch(`/furniture/${fid}/addreview`, { reviewId: rid });
    return response;
}

export const addNewFurniture = async (data) => {
    // for (const pair of data.entries()) {
    //     console.log(pair[0], pair[1]);
    // }
    const response = await api.post(`/furniture/add?admin=true`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response;
}