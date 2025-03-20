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
        selectAllMachines(typeTechnique) {

            if (parseInt(typeTechnique) !== 1) {
                this.machineMarks.forEach(machineMark => {

                    if (!this.selectedMachineMarksIds.includes(machineMark.id)) {
                        this.selectedMachineMarksIds.push(machineMark.id);
                    }

                    machineMark.models.forEach(machineModel => {
                        if (!this.selectedMachineModelIds.includes(machineModel.id)) {
                            this.selectedMachineModelIds.push(machineModel.id);
                        }

                        machineModel.machines.forEach(machine => {
                            if (!this.selectedMachineIds.includes(machine.id)) {
                                this.selectedMachineIds.push(machine.id);
                            }
                        });
                    });
                });

            } else {
                this.machineClass.forEach(machineClass => {
                    if (!this.machineClassIds.includes(machineClass.id)) {
                        this.machineClassIds.push(machineClass.id);
                    }
                    machineClass.children.forEach(children => {
                        if (!this.machineClassIds.includes(children.id)) {
                            this.machineClassIds.push(children.id);
                        }
                        children.children.forEach(child => {
                            if (!this.machineClassIds.includes(child.id)) {
                                this.machineClassIds.push(child.id);
                            }
                        })
                    });
                });
            }
            this.saveStatusFilter()

        },
        saveStatusFilter() {
            localStorage.setItem('selectedMachineModelIds', JSON.stringify(this.selectedMachineModelIds));
            localStorage.setItem('selectedMachineMarkIds', JSON.stringify(this.selectedMachineMarksIds));
            localStorage.setItem('selectedMachineClassIds', JSON.stringify(this.machineClassIds));
            localStorage.setItem('selectedMachineIds', JSON.stringify(this.selectedMachineIds));

        },
        removeStatusFilter(event) {
            // console.log('в remove', this.selectedMachineMarksIds, event)
            if (event === 'class') {
                this.selectedMachineModelIds = [];
                this.selectedMachineMarksIds = [];
                this.selectedMachineIds = [];
            }else if ((event === 'machineType')) {
                this.machineClassIds = [];
            } else {
                this.selectedMachineModelIds = [];
                this.selectedMachineMarksIds = [];
                this.machineClassIds = [];
                this.selectedMachineIds = [];
            }
        },

        async fetchMachines(filterParams) {

            let machineClassId = filterParams.machineClassId || parseInt(localStorage.getItem('selectedMachineTypeIds'));

            if (!machineClassId) {
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

                await MachineClassesDataService.getMashineMarks( filterParams.machineClassId)
                    .then((response) => {
                        this.machineMarks = response.data

                    })
                    .catch((e) => {
                        console.log(e);
                        this.error = e;
                    })

                // await this.selectAllMachines()

            } catch (error) {
                this.error = error;
            } finally {
                this.removeStatusFilter( localStorage.getItem(this.selectedMachineTypeIds === 1 ? 'class' : ''))

                this.selectAllMachines(machineClassId);
                setTimeout(() => {
                    this.loading = false;
                }, 1000)
            }
        },
        selectMachineType(machineType) {
            this.selectedMachineType = machineType;
        },
    },
});