import {
    defineStore
} from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        accessToken: null,
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
                })


                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Ошибка авторизации');
                }

                const data = await response.json();
                this.accessToken = data.access_token;
                this.saveToLocalStorage();
            } catch (error) {
                console.error('Ошибка авторизации:', error);
            }
        },
        logout() {
            this.accessToken = null;
            this.user = null;
            this.removeFromLocalStorage();
        },
        saveToLocalStorage() {
            try {
                localStorage.setItem('accessToken', this.accessToken);
            } catch (error) {
                console.error('Ошибка сохранения токена:', error);
            }
        },
        removeFromLocalStorage() {
            localStorage.removeItem('accessToken');
        },
        loadFromLocalStorage() {
            try {
                const accessToken = localStorage.getItem('accessToken');
                console.log(accessToken);


                if (accessToken) {
                    this.accessToken = accessToken;
                }
            } catch (error) {
                console.error('Ошибка загрузки токена:', error);
                this.accessToken = null;
            }
        }
    },
});