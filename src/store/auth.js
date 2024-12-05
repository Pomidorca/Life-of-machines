import {
    defineStore
} from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        accessToken: null,
        refreshToken: null,
        user: null,
    }),
    actions: {
        async login(credentials) {
            try {
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Ошибка авторизации');
                }

                const data = await response.json();
                this.accessToken = data.access_token;
                this.refreshToken = data.refresh_token;
                this.saveTokensToSessionStorage();
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
                const response = await fetch('http://localhost:3000/auth/login', {
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