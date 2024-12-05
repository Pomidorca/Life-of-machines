import {
    defineStore
} from 'pinia';
import {
    useAuthStore
} from './auth';

export const useMachineStore = defineStore('machine', {
    state: () => ({
        machineTypes: [],
        selectedMachineType: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetchMachines(filterParams) {
            this.loading = true;
            this.error = null;
            const authStore = useAuthStore();
            const token = authStore.accessToken;
            const {
                machineClassId = 5
            } = filterParams || {};
            try {
                const response = await fetch(`http://localhost:3000/data/machine-classes/${machineClassId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                this.machineTypes = data.machineTypes;

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