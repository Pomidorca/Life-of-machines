<template>
    <div class="flex flex-col justify-between px-6 py-10 bg-[#F2F2F2] min-h-[100vh] max-w-[302px] min-w-[302px]">
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
                        <input class='mt-2 bg-[#F2F2F2]' type="date" v-model="startDate" @change="updateYearRange">
                    </div>
                    <div>
                        <p class="text-xl leading-6 text-[#001233]">До</p>
                        <input class='mt-2 bg-[#F2F2F2]' type="date" v-model="endDate" @change="updateYearRange">
                    </div>
                </div>
                <button @click="updateYearRange"
                    class="py-3 bg-[#0554F2] text-white text-2xl leading-5 font-medium rounded-lg hover:bg-[#2905f2] duration-300">Принять</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Equipment from './Equipment.vue';
import { useActiveStore } from '@/store/active.js';

const activeStore = useActiveStore();
const startDate = ref(null);
const endDate = ref(null);
const toggle = ref('Год');


const handleClick = (value) => {
    toggle.value = value;
}

const updateYearRange = () => {
    const startYear = startDate.value ? new Date(startDate.value).getFullYear() : 2000;
    const endYear = endDate.value ? new Date(endDate.value).getFullYear() : 2000;

    if (startYear > endYear) {
        console.error("Ошибка: 'Начало' не может быть позже 'Конца'.");
        return;
    }

    activeStore.updateFilterParams({ yearStart: startYear, yearEnd: endYear });
};

</script>
