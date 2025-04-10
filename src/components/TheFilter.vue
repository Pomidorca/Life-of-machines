<template>
    <div class="flex flex-col h-full">
        <div>
            <h3 class="title-technique">Оборудование</h3>
            <div class="wrapper-technic-window overflow-y-auto px-4 py-3 bg-white mt-3 rounded-lg drop-shadow-lg">
                <Equipment />
            </div>
        </div>

        <div class="mt-5 flex flex-col justify-between h-full">
            <div class="flex flex-col mt-3 gap-y-3">
                <div class="grid gap-2 grid-cols-3">
                    <div
                        class="item-type-time-range"
                        @click="handleClick('month')"
                        :class="{ 'active': toggle === 'month' }">Мес.</div>
                    <div
                        class="item-type-time-range"
                        @click="handleClick('quarter')"
                        :class="{ 'active': toggle === 'quarter' }">Кв.</div>
                    <div
                        class="item-type-time-range"
                        @click="handleClick('year')"
                        :class="{ 'active': toggle === 'year' }">Год</div>
                </div>
                <div class="flex mt-5">
                  <div class="w-1/2">
                    <p class="text-xl leading-6 text-[#001233]">От</p>
                  </div>

                  <div class="w-1/2 ps-4">
                    <p class="text-xl leading-6 text-[#001233]">До</p>
                  </div>
                </div>
                <div class="flex">
                    <div class="w-1/2">
                        <input class="" type="date" :disabled="isError" v-model="startDate" max="2040-01-01" min="1900-01-01" />
                    </div>
                    <div class="wrapper-border-line mx-1">
                      <div class="border-line"></div>
                    </div>
                    <div class="w-1/2">
                        <input class="" type="date" :disabled="isError" v-model="endDate" max="2040-01-01" min="1900-01-01" />
                    </div>
                </div>
                <div class="flex justify-between mt-3">
                    <button @click="setFullPeriod" class="all-time-button py-3">
                        {{ dateStore.loading ? 'Загрузка...' : 'Весь период' }}
                    </button>
                </div>
            </div>
            <div class="flex justify-between gap-x-3 mt-3">
                <button @click="updateYearRange"
                        class="send-button py-3">Применить</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Equipment from './Equipment.vue';
import { useActiveStore } from '@/store/active.js';
import { useMachineStore } from '@/store/machine.js';
import { useKFVStore } from '@/store/kfv';
import { useRoute, useRouter } from 'vue-router';
import { useTEPStore } from "@/store/tep.js";
import { pages } from '@/utilities/pagesData.js'
import { useDateStore } from '@/store/date';

const route = useRoute();
const router = useRouter();
const activeStore = useActiveStore();
const machineStore = useMachineStore();
const kfvStore = useKFVStore();
const tepStore = useTEPStore();
const dateStore = useDateStore();
const startDate = ref(new Date(defaultStartYear, 0, 1));
const endDate = ref(new Date(defaultEndYear, 11, 31));
const toggle = ref('year');
const selectedMachineTypeIds = ref([]);
const defaultStartYear = 2000;
const defaultEndYear = 2025;
const isError = ref(false)
const timeInterval = ref(route.query.toggle)
const isLoading = ref(false);

const setFullPeriod = async () => {
    
    if(dateStore.loading) return

    try {
        

        await dateStore.fetchDate();

        startDate.value = dateStore.earliestDate.toISOString().split('T')[0];
        
        endDate.value = new Date().toISOString().split('T')[0];

        updateUrl()
        
        
    } catch (error) {
        
    } finally {
        isLoading.value = false;
    }
  
};

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
            updateUrl()
        } catch (error) {
            console.error("Ошибка при загрузке состояния из localStorage:", error);
        }
    }
    if (!startDate.value || !endDate.value) {
        startDate.value = new Date(defaultStartYear, 0, 1);
        endDate.value = new Date(defaultEndYear, 11, 31);
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
    machineStore.resetMachineTypes();

    startDate.value = new Date(defaultStartYear, 0, 1);
    endDate.value = new Date(defaultEndYear, 11, 31);

    updateYearRange();
    saveStateToStorage();
};

const updateUrl = () => {
    const startYear = startDate.value ? new Date(startDate.value).getFullYear() : 2000;
    const endYear = endDate.value ? new Date(endDate.value).getFullYear() : 2024;
    const timeRange = startYear && endYear ? `${startYear}-${endYear}` : '';

    const newQuery = {
        ...route.query,
        toggle: toggle.value,
        timeRange: timeRange,
    };

    router.replace({ path: route.path, query: newQuery });
}


const updateYearRange = () => {
    const startYear = startDate.value ? new Date(startDate.value).getFullYear() : 2000;
    const endYear = endDate.value ? new Date(endDate.value).getFullYear() : 2024;

    if (startYear > endYear) {
        console.error("Ошибка: 'Начало' не может быть позже 'Конца'.");
        isError.value = true
        return;
    } else {
        isError.value = false
    }

    // const currentPage = pages.find(page => page.name === route.name);
    // if (currentPage && currentPage.updateStore) {
    //     currentPage.updateStore(startYear, endYear, timeInterval.value);
    // } else {
    //     console.warn('Неизвестная страница или отсутствует функция обновления.');
    // }

    activeStore.updateFilterParams({ yearStart: startYear, yearEnd: endYear });
    kfvStore.updateFilterParams({ yearStart: startYear, yearEnd: endYear });
    tepStore.updateFilterParams({ yearStart: startYear, yearEnd: endYear }, timeInterval)
    
    saveStateToStorage();
};

onMounted(() => {
    loadStateFromStorage();
    updateYearRange();
});

watch(() => route.query.toggle, (newToggle) => {
    if (newToggle) {
        timeInterval.value = newToggle;
        updateYearRange()
    }
});
</script>
