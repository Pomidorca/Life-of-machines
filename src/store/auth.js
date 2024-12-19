import {
    defineStore
} from "pinia";
import UserDataService from "@/services/UserDataService.js";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL
export const useAuthStore = defineStore("auth", {
    state: () => ({
        accessToken: null,
        refreshToken: null,
        user: null,
        errorMessage: null,
    }),
    actions: {
        async login(credentials) {
            this.errorMessage = null;
            try {
                 await UserDataService.postLogin(credentials)
                    .then((response) => {
                        const data = response.data;
                        this.accessToken = data.access_token;
                        this.refreshToken = data.refresh_token;
                        this.saveTokensToSessionStorage()
                    })
                    .catch((e) => {
                        console.log(e)
                        this.errorMessage = 'Ошибка авторизации';
                    })
                // const response = await fetch(`${API_BASE_URL}/auth/login`, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(credentials),
                // });

                // if (!response.ok) {
                //     const errorData = await response.json();
                //     this.errorMessage = errorData.message || 'Ошибка авторизации';
                //     throw new Error(this.errorMessage);
                // }

                // const data = await response.data;
                // console.log(data.access_token)
                // this.accessToken = data.access_token;
                // this.refreshToken = data.refresh_token;
                // this.user = data.user;
                // this.saveTokensToSessionStorage();
            } catch (error) {
                console.error('Ошибка авторизации:', error);
            }
        },
        logout() {
            this.accessToken = null;
            this.refreshToken = null;
            this.user = null;
            this.removeFromSessionStorage();
        },
        saveTokensToSessionStorage() {
            sessionStorage.setItem('accessToken', this.accessToken);

            sessionStorage.setItem('refreshToken', this.refreshToken);
        },
        removeFromSessionStorage() {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refreshToken');
        },
        loadTokensFromSessionStorage() {
            this.accessToken = sessionStorage.getItem('accessToken');
            this.refreshToken = sessionStorage.getItem('refreshToken');
        },
        async refreshAccessToken() {
            try {
                const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        refreshToken: this.refreshToken
                    }),
                });

                if (!response.ok) {
                    throw new Error('Ошибка обновления токена');
                }

                const data = await response.json();
                this.accessToken = data.access_token;
                this.saveTokensToSessionStorage();
                return this.accessToken;
            } catch (error) {
                console.error('Ошибка обновления токена:', error);
                this.logout();
                return null;
            }
        }

    },
});