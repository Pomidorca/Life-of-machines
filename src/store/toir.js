import { defineStore } from "pinia";
import {useAuthStore} from "@/store/auth.js";
import TOIRDataService from "@/services/TOIRDataService.js";

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

            const { dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds, breakdownType, level } = this.filterParams

            try {

                await TOIRDataService.getIndicatorOfOrganizationOfRepairs()
                    .then((response) => {

                        console.log(response)
                    })
                    .catch((e) => {
                        console.log(e)
                    })

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
