import {
    defineStore
} from 'pinia';

import MachineClassesDataService from '@/services/MachineClassesDataService';

export const useMachineStore = defineStore('machine', {
    state: () => ({
        machineClass: [],
        machineTypes: [],
        machineMarks: [],
        selectedMachineType: null,
        machineClassIds: [],
        selectedMachineTypeIds: [],
        selectedMachineModelIds: [],
        selectedMachineMarksIds: [],
        loading: false,
        error: null,
    }),
    actions: {
        resetMachineTypes() {
            this.selectedMachineTypeIds = [];
            localStorage.setItem('selectedMachineTypeIds', JSON.stringify([]));
        },
        saveStatusFilter() {
            localStorage.setItem('selectedMachineModelIds', JSON.stringify(this.selectedMachineModelIds));
            localStorage.setItem('selectedMachineMarkIds', JSON.stringify(this.selectedMachineMarksIds));
            localStorage.setItem('selectedMachineClassIds', JSON.stringify(this.machineClassIds));
        },
        async fetchMachines(filterParams) {
            console.log(filterParams);
            
            this.loading = true;
            this.error = null;
            const machineClassId = filterParams && filterParams.machineClassId ? filterParams.machineClassId : 1; 
            try {

                await MachineClassesDataService.getMashineClasses()
                .then((response) => {
                    
                    this.machineClass = response.data

                    console.log(response.data);
                    
                        
                })
                .catch((e) => {
                    console.log(e);
                    this.error = e;
                })

                await MachineClassesDataService.getMashineMarks(machineClassId)
                    .then((response) => {
                        
                        this.machineMarks = response.data

                    })
                    .catch((e) => {
                        console.log(e);
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