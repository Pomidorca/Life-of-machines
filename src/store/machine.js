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
        selectedMachineIds: [],
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
            localStorage.setItem('selectedMachineIds', JSON.stringify(this.selectedMachineIds));
        },
        removeStatusFilter() {
            localStorage.removeItem('selectedMachineModelIds');
            localStorage.removeItem('selectedMachineMarkIds');
            localStorage.removeItem('selectedMachineIds');
        },

        async fetchMachines(filterParams) {

            let machineClassId;

            const storedCardsTechnique = localStorage.getItem('CardsTechnique');

            if (storedCardsTechnique) {
                const parsedCardsTechnique = JSON.parse(storedCardsTechnique);

                machineClassId = parsedCardsTechnique.selectedTechniqueId;

            } else {
                machineClassId = filterParams && filterParams.machineClassId ? filterParams.machineClassId : 1;
            }

            
            this.loading = true;
            this.error = null;
            
            try {

                await MachineClassesDataService.getMashineClasses()
                .then((response) => {
                    
                    this.machineClass = response.data
                        
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