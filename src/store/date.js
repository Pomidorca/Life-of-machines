import UserDataService from "@/services/UserDataService";
import {ref} from "vue";
import {
    defineStore
} from "pinia";

export const useDateStore = defineStore("earliest-date-state", {
    state: () => {
        return {
            loading: false,
            earliestDate: null,
            filterParams: ref({
                            machineModelIds: [],
                            machineMarkIds: [],
                            machineClassIds: [],
                            machineIds: [],
                        }),
        }
    },
    actions: {
        filterMachines() {
            const machineModelIds = localStorage.getItem('selectedMachineModelIds');
            const machineMarkIds = localStorage.getItem('selectedMachineMarkIds');
            const machineClassIds = localStorage.getItem('selectedMachineClassIds');
            const machineIds = localStorage.getItem('selectedMachineIds');
            let machineTypeIds = localStorage.getItem('selectedMachineTypeIds');

            let classIds;

            if (machineClassIds && JSON.parse(machineClassIds).length > 0) {

                classIds = JSON.parse(machineClassIds);
            } else if (machineTypeIds) {

                if (Array.isArray(JSON.parse(machineTypeIds))) {

                    classIds = JSON.parse(machineTypeIds);
                } else {

                    classIds = [JSON.parse(machineTypeIds)];
                }
            } else {

                classIds = [1];
            }

            this.$patch(state => {
                state.filterParams.machineModelIds = machineModelIds ? JSON.parse(machineModelIds) : [];
                state.filterParams.machineMarkIds = machineMarkIds ? JSON.parse(machineMarkIds) : [];
                state.filterParams.machineClassIds = classIds;
                state.filterParams.machineIds = machineIds ? JSON.parse(machineIds) : [];
            });
        },
        async fetchDate() {

            this.loading = true

            try {
                this.filterMachines()

                
                const { machineClassIds, machineMarkIds, machineModelIds, machineIds } = this.filterParams;
                
                await UserDataService.getEarliestEntryDate( machineClassIds, machineMarkIds, machineModelIds, machineIds )
                    .then((response) => {
                        
                        this.earliestDate = new Date(response.data);
                        
                    })
                    .catch((e) => {
                        console.error("Ошибка:", e);
                        return '2000-01-01';
                    }) 
            } catch (e) {
                console.log(e);
                
            } finally {
                setTimeout(() => {
                    this.loading = false;
                }, 1000)
            }
        }
    }
})