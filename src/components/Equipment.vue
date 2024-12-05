<template>
    <div>
        <div v-if="machineStore.loading">Загрузка...</div>
        <div v-else-if="machineStore.error">Ошибка: {{ machineStore.error.message }}</div>
        <div v-else class="flex flex-col" v-for="machineType in machineStore.machineTypes" :key="machineType.id">
            <div class="flex items-center w-full justify-between mb-3">
                <p class="text-[#979DAC]">{{ machineType.name }}</p>
                <button @click="handleClick(machineType)">
                    <img v-if="!machineType.showDetails" src="/img/filter/Caret_Down_SM.svg" alt="">
                    <img v-if="machineType.showDetails" src="/img/filter/Caret_Up_SM.svg" alt="">
                </button>
            </div>
            <div v-if="machineType.showDetails">
                <div class="flex mb-3 ml-6" v-for="machine in machineType.machines" :key="machine.id">
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
import { onMounted } from 'vue';

const machineStore = useMachineStore();

const handleClick = (machineType) => {
    machineType.showDetails = !machineType.showDetails;
};

onMounted(() => {
    machineStore.fetchMachines();
});
</script>