import {
    defineStore
} from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        auth: false,
        test: '1234',
    }),
    actions: {
        login() {
            this.auth = true;
        },
        logout() {
            this.auth = false;
        },
    },
});