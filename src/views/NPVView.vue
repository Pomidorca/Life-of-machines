<template>
    <div class="flex flex-col">
        <div class="flex justify-between items-start">
            <StrategiesForNPV />
            <router-link class="mr-5 py-2 px-6 border border-[#0554F2] text-[#0554F2] text-xl font-medium rounded-lg"
                :class="{ 'text-[white] bg-[#0554F2]': $route.query.mode === 'DynamicStructure' }"
                :to="{ name: $route.name, params: { pageName: $route.params.pageName }, query: { mode: 'DynamicStructure' } }">
                Сравнение
            </router-link>
        </div>
        <div class=" mt-10">
            <ChartsView :mode="mode" />
        </div>
    </div>
</template>



<script setup>
import ChartsView from '@/components/Charts/NPV/NPV.vue';
import StrategiesForNPV from '@/components/StrategiesForNPV.vue';
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const mode = computed(() => route.query.mode || 'GeneralInformation');

watch(mode)
</script>