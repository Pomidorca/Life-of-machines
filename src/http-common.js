import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-type": "application/json"
    }
});

instance.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {

        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {

        return response;
    },
    error => {

        if (error.response && error.response.status === 401) {
            logout();
        }
        return Promise.reject(error);
    }
);

function logout() {
    this.accessToken = null;
    this.refreshToken = null;
    this.user = null;
    this.removeFromSessionStorage();
}

export default instance;