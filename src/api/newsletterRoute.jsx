import api from "./axiosConfig";

export const sendNewsletterRegards = async (email, subject, message) => {
    const response = await api.post("/send-newsletter", {
        email,
        subject,
        message,
    });
    return response.data;
}