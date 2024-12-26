<template>
    <div class="flex flex-col justify-between px-6 py-10 bg-[#F2F2F2] max-w-[302px] min-w-[302px]">
        <div>
            <h3 class="text-xl text-[#001233] font-medium leading-6">Оборудование</h3>
            <div class="h-80 overflow-y-auto px-4 py-3 bg-white mt-3 rounded-lg drop-shadow-lg">
                <Equipment />
            </div>
        </div>

        <div class="mt-5">
            <div class="flex flex-col mt-3 gap-y-3">
                <div class="flex justify-between">
                    <button
                        class="py-2 px-6 border border-[#979DAC] rounded-lg text-[#979DAC] font-semibold duration-300"
                        @click="handleClick('Мес.')"
                        :class="{ 'bg-[#0554F2] text-white': toggle == 'Мес.' }">Мес.</button>
                    <button
                        class="py-2 px-6 border border-[#979DAC] rounded-lg text-[#979DAC] font-semibold duration-300"
                        @click="handleClick('Кв.')" :class="{ 'bg-[#0554F2] text-white': toggle == 'Кв.' }">Кв.</button>
                    <button
                        class="py-2 px-6 border border-[#979DAC] rounded-lg text-[#979DAC] font-semibold duration-300"
                        @click="handleClick('Год')" :class="{ 'bg-[#0554F2] text-white': toggle == 'Год' }">Год</button>
                </div>
                <div class="flex gap-x-3">
                    <div>
                        <p class="text-xl leading-6 text-[#001233]">От</p>
                        <input class='mt-2 bg-[#F2F2F2]' type="date" v-model="startDate" @change="updateYearRange"
                            max="2040-01-01" min="1900-01-01">
                    </div>
                    <div>
                        <p class="text-xl leading-6 text-[#001233]">До</p>
                        <input class='mt-2 bg-[#F2F2F2]' type="date" v-model="endDate" @change="updateYearRange"
                            max="2040-01-01" min="1900-01-01">
                    </div>
                </div>
                <div class="flex justify-between gap-x-3">
                    <button @click="resetButton"
                        class="py-3 px-2 bg-[#ff6384] text-white text-xl leading-5 font-medium rounded-lg hover:bg-[#b64961] duration-300">Сбросить</button>
                    <button @click="updateYearRange"
                        class="py-3 w-full bg-[#0554F2] text-white text-xl leading-5 font-medium rounded-lg hover:bg-[#2905f2] duration-300">Применить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Equipment from './Equipment.vue';
import { useActiveStore } from '@/store/active.js';
import { useMachineStore } from '@/store/machine.js';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const activeStore = useActiveStore();
const machineStore = useMachineStore();
const startDate = ref(null);
const endDate = ref(null);
const toggle = ref('Год');
const selectedMachineTypeIds = ref([]);

const loadStateFromStorage = () => {
    const storedState = localStorage.getItem('filterDate');
    const machineTypeIds = localStorage.getItem('selectedMachineTypeIds');
    if (storedState) {
        try {
            const pasedMashineType = JSON.parse(machineTypeIds);
            const parsedState = JSON.parse(storedState);
            selectedMachineTypeIds.value = pasedMashineType;
            startDate.value = parsedState.startDate;
            endDate.value = parsedState.endDate;
            toggle.value = parsedState.toggle;
        } catch (error) {
            console.error("Ошибка при загрузке состояния из localStorage:", error);
        }
    }
};

const saveStateToStorage = () => {
    localStorage.setItem('filterDate', JSON.stringify({ startDate: startDate.value, endDate: endDate.value, toggle: toggle.value }));
};

const handleClick = (value) => {
    toggle.value = value;
    saveStateToStorage();
    updateUrl()
};

const resetButton = () => {
    selectedMachineTypeIds.value = [];
    activeStore.updateFilterParams({ machineTypeIds: [] });
    localStorage.setItem('selectedMachineTypeIds', JSON.stringify(selectedMachineTypeIds.value));
    machineStore.resetMachineTypes()

}

const updateUrl = () => {
    const startYear = startDate.value ? new Date(startDate.value).getFullYear() : 2000;
    const endYear = endDate.value ? new Date(endDate.value).getFullYear() : 2024;
    const timeRange = startYear && endYear ? `${startYear}-${endYear}` : '';

    const newQuery = {
        ...route.query,
        toggle: toggle.value,
        timeRange: timeRange,
    };

    router.push({ path: route.path, query: newQuery });
}


const updateYearRange = () => {
    const startYear = startDate.value ? new Date(startDate.value).getFullYear() : 2000;
    const endYear = endDate.value ? new Date(endDate.value).getFullYear() : 2024;

    if (startYear > endYear) {
        console.error("Ошибка: 'Начало' не может быть позже 'Конца'.");
        return;
    }

    activeStore.updateFilterParams({ yearStart: startYear, yearEnd: endYear });
    saveStateToStorage();
    updateUrl();
};

onMounted(() => {
    loadStateFromStorage();
    if (!startDate.value || !endDate.value) {
        resetButton()
    } else {
        updateYearRange()
    }
    updateUrl();
});

</script>
