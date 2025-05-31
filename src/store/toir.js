import { defineStore } from "pinia";
import {useAuthStore} from "@/store/auth.js";
import {resolve} from "chart.js/helpers";

export const useTOIRStore = defineStore("TOIR", {
    state: () => {
        return {
            loading: false,
            error: false,
            filterParams: {
                dateStart: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().slice(0, 10),
                dateEnd: new Date().toISOString().slice(0, 10),
                breakdownType: null,
                machineModelIds: [],
                machineMarkIds: [],
                machineClassIds: [],
                machineIds: [],
                machineTypeIds: [],
            },
        }
    },
    actions: {
        async fetchData() {

            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.accessToken;

            if (!token) {
                this.error = "Token not found!";
                this.loading = false;
                return;
            }

            try {

                console.log('im here!')


            } catch (e) {
                console.log(e)
                this.error = e
            } finally {
                setTimeout(() => {
                    this.loading = false
                }, 3000)
            }
        }
    }
})
