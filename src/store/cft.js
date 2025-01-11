import { defineStore } from "pinia";
import { ChangeOperatingTime } from "@/components/Charts/KFV/index.js";
import CTFDataService from "@/services/CTFDataService.js";

export const useCTFChartsStore = defineStore('ctfCharts',{
    state: () => ({
        initialChangeOperatingTime: ChangeOperatingTime
    }),
    actions: {
        async updateChartWorkTimeByServiceLife() {
            try {
                await CTFDataService.getWorkTimeByServiceLife()
                    .then((response) => {
                        // throw  new Error('Попа единорога ')
                        console.log(response.data)

                        const data = response.data

                        const labels = []

                        const datasetsBlue = []

                        const datasetsRed = []

                        data.map((item, index) => {

                            labels.push(item.serviceLife)

                            datasetsRed.push(item.worktime)

                            datasetsBlue.push(item.worktimeAverage)
                        })

                        this.initialChangeOperatingTime.labels = labels;
                        this.initialChangeOperatingTime.datasets[0].data = datasetsBlue;
                        this.initialChangeOperatingTime.datasets[1].data = datasetsRed;

                    })
                    .catch((e) => {
                        console.log(e)
                    })

            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        }
    }
});
