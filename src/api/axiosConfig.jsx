import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Attach token to requests
api.interceptors.request.use(
    (config) => {
        const AccessToken = localStorage.getItem("AccessToken");
        if (AccessToken) {
            config.headers.Authorization = `Bearer ${AccessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Refresh token logic
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await api.post('/user/refresh');
                const { accessToken } = res.data;
                localStorage.setItem("AccessToken", accessToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (err) {
                localStorage.removeItem("AccessToken");
                window.location.href = '/';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default api;