<template>
    <div class="flex flex-col justify-between px-6 py-10 bg-[#F2F2F2] min-h-[100vh] max-w-[302px]">
        <div>
            <h3 class="text-xl text-[#001233] font-medium leading-6">Оборудование</h3>
            <div class="h-80 overflow-y-auto px-4 py-3 bg-white mt-3 rounded-lg drop-shadow-lg">
                <Equipment />
            </div>
        </div>


        <div class="mt-5">
            <div class="flex flex-col mt-3 gap-y-3">
                <div class="flex justify-between">
                    <button class="py-2 px-6 bg-[#0554F2] rounded-lg text-white font-semibold">Мес.</button>
                    <button
                        class="py-2 px-6 bg-transparent border border-[#979DAC] rounded-lg text-[#979DAC] font-semibold">Кв.</button>
                    <button
                        class="py-2 px-6 bg-transparent border border-[#979DAC] rounded-lg text-[#979DAC] font-semibold">Год</button>
                </div>
                <!-- <input type="range"> -->
                <div class="flex gap-x-3">
                    <div>
                        <p class="text-xl leading-6 text-[#001233]">От</p>
                        <input class='mt-2 bg-[#F2F2F2]' type="date" v-model="start">
                    </div>
                    <hr>
                    <div>
                        <p class="text-xl leading-6 text-[#001233]">До</p>
                        <input class='mt-2 bg-[#F2F2F2]' type="date" v-model="end">
                    </div>
                </div>
                <button
                    class="py-3 bg-[#0554F2] text-white text-2xl leading-5 font-medium rounded-lg hover:bg-[#2905f2] duration-300"
                    @click="activeStore.getActive(start, end)">Весь
                    период</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { watchEffect, ref } from 'vue';
import Equipment from './Equipment.vue';
import { useActiveStore } from '@/store/active.js';

const activeStore = useActiveStore();
const start = ref('');
const end = ref('');
const activeData = ref(null);

watchEffect(async () => {
    if (start.value && end.value) {
        await activeStore.getActive(start.value, end.value);
        activeData.value = activeStore.activeData;
    }
})


</script>