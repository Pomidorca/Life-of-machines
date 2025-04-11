<template>
    <div>

        <div v-if="mode === 'GeneralInformation'">
            <div v-if="loading" class="wrapper-loader">
              <span class="loader"></span>
            </div>
            <div v-else-if="error">Ошибка: {{ error }}</div>
            <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                <div class="element-chart" style="aspect-ratio: 16 / 9; height: auto;">
                    <Line :options="ChangesStructureKFVOptions" :data="changesStructureKFV" />
                </div>

                <div class="element-chart" style="aspect-ratio: 16 / 9; height: auto;">
                    <Radar :options="StructureKFVOptions" :data="structureKFV" />
                </div>
            </div>
        </div>



        <div v-else-if="mode === 'DynamicStructure'">
            <div v-if="loading">Загрузка...</div>
            <div v-else-if="error">Ошибка: {{ error }}</div>
            <div v-else class="grid grid-cols-2 gap-6">
                <div class="flex flex-col gap-y-6">
                    <div class="element-chart">
                        <Bar :options="detailedStructureCfvOneOptions" :data="detailedStructureCfvOne" />
                    </div>
                    <div class="element-chart">
                        <Bar :options="detailedStructureCfvTwoOptions" :data="detailedStructureCfvTwo" />
                    </div>
                </div>
                <div class="element-chart">
                    <Bar :options="detailedStructureCfvThreeOptions" :data="detailedStructureCfvThree" />
                </div>
            </div>
        </div>

        <div v-else-if="mode === 'analysis'">
            <div v-if="loading">Загрузка...</div>
            <div v-else-if="error">Ошибка: {{ error }}</div>
            <div v-else class="element-chart"
                style="aspect-ratio: 16 / 7; height: auto;">
                <Line :options="ChangeOperatingTimeOptions" :data="ChangeOperatingTime" />
            </div>
        </div>


    </div>

</template>
<script setup>
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ScatterController,
    Filler,
    RadialLinearScale,
} from 'chart.js'
import {
    Line,
    Radar,
    Bar
} from 'vue-chartjs'
import { useKFVStore } from '@/store/kfv';
import { computed, onMounted } from 'vue';
import { ChangesStructureKFVOptions, StructureKFVOptions, ChangeOperatingTimeOptions, detailedStructureCfvOne, detailedStructureCfvTwo, detailedStructureCfvThree, detailedStructureCfvOneOptions, detailedStructureCfvTwoOptions, detailedStructureCfvThreeOptions, ChangeOperatingTime } from '@/components/Charts/KFV/index.js';
import * as charts from '@/components/Charts/KFV/index.js';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ScatterController,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
)

const props = defineProps({
    mode: {
        type: String,
        default: 'GeneralInformation'
    }
})
const KFVStore = useKFVStore();

const loading = computed(() => KFVStore.loading);
const error = computed(() => KFVStore.error);

const changesStructureKFV = computed(() => KFVStore.changesStructureKFV);
const structureKFV = computed(() => KFVStore.structureKFV);

onMounted(async () => {
    await KFVStore.fetchKFV();
})
</script>
<style></style>