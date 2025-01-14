<template>
    <div class="relative">
        <div class="duration-300" v-if="machineStore.loading">Загрузка...</div>
        <div v-else-if="machineStore.error">Ошибка: {{ machineStore.error.message }}</div>
        <div v-else class="flex flex-col" v-for="machineType in machineStore.machineTypes" :key="machineType.id">
            <div class="flex items-center w-full justify-between mb-3">
                <div class="flex gap-x-2">
                    <input type="checkbox" :id="machineType.id" :value="machineType.id"
                        v-model="selectedMachineTypeIds">
                    <p class="text-[#979DAC]">{{ machineType.name }}</p>
                </div>
                <button @click="handleClick(machineType)">
                    <img v-if="!machineType.showDetails" src="/img/filter/Caret_Down_SM.svg" alt="">
                    <img v-if="machineType.showDetails" src="/img/filter/Caret_Up_SM.svg" alt="">
                </button>
            </div>
            <div v-if="machineType.showDetails">
                <div class="flex mb-3 ml-3 gap-x-2" v-for="machine in machineType.machines" :key="machine.id">
                    <input type="checkbox" :id="machine.id" :value="machine.id" v-model="selectedMachineTypeIds">
                    <p class="text-[#979DAC]">
                        {{ machineType.name }} - {{ machine.inventoryNumber }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMachineStore } from '@/store/machine';
import { onMounted, watch, computed } from 'vue';
import { useActiveStore } from '@/store/active';
import { useKFVStore } from '@/store/kfv';

const machineStore = useMachineStore();
const activeStore = useActiveStore();
const kfvStore = useKFVStore();

const selectedMachineTypeIds = computed({
    get() {
        return machineStore.selectedMachineTypeIds
    },
    set(value) {
        machineStore.selectedMachineTypeIds = value
    },
});



const saveStateToStorage = () => {
    localStorage.setItem('selectedMachineTypeIds', JSON.stringify(selectedMachineTypeIds.value));
    activeStore.updateFilterParams({
        machineTypeIds: selectedMachineTypeIds.value,
    });
    kfvStore.updateFilterParams({
        machineTypeIds: selectedMachineTypeIds.value,
    });
};


const loadStateFromStorage = () => {
    try {
        const storedTypeIds = JSON.parse(localStorage.getItem('selectedMachineTypeIds')) || [];

        selectedMachineTypeIds.value = storedTypeIds;
        activeStore.machineTypeIds = [...storedTypeIds];
    } catch (error) {
        console.error('Ошибка при загрузке состояния:', error);
    }
};



const handleClick = (machineType) => {
    machineType.showDetails = !machineType.showDetails;
};


onMounted(() => {
    machineStore.fetchMachines();
    loadStateFromStorage();
});

watch([selectedMachineTypeIds], saveStateToStorage, { deep: true });
</script>