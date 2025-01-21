import {
    defineStore
} from 'pinia';

import MachineClassesDataService from '@/services/MachineClassesDataService';

export const useMachineStore = defineStore('machine', {
    state: () => ({
        machineTypes: [],
        selectedMachineType: null,
        selectedMachineTypeIds: [],
        loading: false,
        error: null,
    }),
    actions: {
        resetMachineTypes() {
            this.selectedMachineTypeIds = [];
            localStorage.setItem('selectedMachineTypeIds', JSON.stringify([]));
        },
        async fetchMachines(filterParams) {
            this.loading = true;
            this.error = null;
            const {
                machineClassId = 1
            } = filterParams || {};
            try {
                await MachineClassesDataService.getMashineClasses(filterParams.machineClassId)
                    .then((response) => {
                        const data = response.data;
                        console.log(data)
                        let machineTypes = [];
                        if (machineClassId === 1) {
                            const children = data.children.flatMap(child => child.children || []);
                            machineTypes = children.flatMap(child => child.machineTypes || []);
                        } else if (machineClassId >= 2) {
                            machineTypes = data.machineTypes || [];
                        } else {
                            machineTypes = [];
                            console.warm('Неизвестный machineClassId', machineClassId);
                        }

                        this.machineTypes = machineTypes;
                        console.log(this.machineType)
                        this.selectedMachineType = machineTypes[0];
                    }).catch((e) => {
                        console.log(e)
                        this.error = e;
                    })
            } catch (error) {
                this.error = error;
            } finally {
                this.loading = false;
            }
        },
        selectMachineType(machineType) {
            this.selectedMachineType = machineType;
        },
    },
});