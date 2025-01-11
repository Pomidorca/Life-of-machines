import {
    defineStore
} from "pinia";

import { ChangeOperatingTime as initialChangeOperatingTime } from "@/components/Charts/KFV/index.js";
import CTFDataService from "@/services/CTFDataService.js";

export const useCTFChartsStore = defineStore({
    state: () => ({
        ChangeOperatingTime: initialChangeOperatingTime
    }),
    actions: {
        async updateChartWorkTimeByServiceLife(newData) {
            // await CTFDataService.getWorkTimeByServiceLife()
            //     .then((response) => {
            //         console.log(response)
            //     })
            //     .catch((e) => {
            //         console.log(e)
            //     })
            console.log(newData)
        }
    }
})