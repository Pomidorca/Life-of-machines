import {
    defineStore
} from 'pinia';
import {
    useAuthStore
} from './auth';

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL
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
                machineClassId = 1
            } = filterParams || {};
            try {
                const response = await fetch(`${API_BASE_URL}/data/machine-classes/${machineClassId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

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
                this.selectedMachineType = machineTypes[0];
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