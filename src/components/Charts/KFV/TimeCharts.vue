<template>
    <div>

        <div v-if="mode === 'GeneralInformation'">
            <div v-if="loading" class="wrapper-loader">
              <span class="loader"></span>
            </div>
            <div v-else-if="error">Ошибка: {{ error }}</div>
            <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                <div class="element-chart col-span-2" style="min-height: 50px; height: auto;">
                    <div class="flex">
                        <img src="/img/specialСharacters/warning-circle-svgrepo-com.svg" alt=""/>
                        <h2 class="tips-title ms-1">
                          Примечание:
                        </h2>
                    </div>
                    <hr class="my-2">
                    <span class="tips-description">
                        Для просмотра графика "Структура КФВ среднесписочной единицы техники" выберите год на графике "Изменения структуры КФВ среднесписочной единицы техники"
                    </span>
                </div>
                <div class="element-chart" style="aspect-ratio: 16 / 9; height: auto;">
                    <Line ref="chartRef" :options="ChangesStructureKFVOptions" :data="changesStructureKFV" @click="handleClickChart"/>
                </div>
                <div v-if="loadingStructureKFV" class="element-chart">
                    <div class="element-chart flex flex-col justify-center item-center">
                        <span class="tips-description text-center">
                          Загрузка...
                        </span>
                    </div>
                </div>
                <div v-else-if="errorStructureKFV" class="element-chart">
                    <div class="element-chart flex flex-col justify-center item-center">
                        <img src="/img/specialСharacters/no-selected.gif" alt="" style="height: 100px; width: 100px; margin: 0 auto;"/>
                        <span class="tips-description text-center mt-5">
                            {{ errorStructureKFV }}
                        </span>
                    </div>
                </div>
                <div v-else class="element-chart">
                  <div class="element-chart" style="aspect-ratio: 16 / 9; height: auto;">
                    <Radar :options="StructureKFVOptions" :data="structureKFV" />
                  </div>
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

    <div class="wrapper-tips">
      <div v-for="(item, index) in tips" class="element-tip flex">
        Выберите элемент
        <div class="close-wrapper cursor-pointer ms-2" @click="closeTip(index)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="18" y1="6" x2="6" y2="18" stroke="black" stroke-width="2" stroke-linecap="round"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="black" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
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
import {computed, onMounted, ref} from 'vue';
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

const chartRef = ref(null);
const props = defineProps({
    mode: {
        type: String,
        default: 'GeneralInformation'
    }
})
const tips = ref([])
const KFVStore = useKFVStore();
const loadingStructureKFV = computed(() => KFVStore.loadingStructureKFV)
const errorStructureKFV = computed(() => KFVStore.errorStructureKFV)

const loading = computed(() => KFVStore.loading);
const error = computed(() => KFVStore.error);

const changesStructureKFV = computed(() => KFVStore.changesStructureKFV);
const structureKFV = computed(() => KFVStore.structureKFV);

function handleClickChart(event) {

  const chart = chartRef.value?.chart;
  if (!chart) {
    console.warn('Chart ref is not available');
    return;
  }

  const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);

  console.log(activePoints)
  if (activePoints.length) {
    const firstPoint = activePoints[0];
    const label = chart.data.labels[firstPoint.index];

    KFVStore.updateChartStructureKFV(label)

  } else {

    const id = Symbol();

    tips.value.push({ id, value: 1 });

    setTimeout(() => {
      const index = tips.value.findIndex(item => item.id === id);
      if (index !== -1) {
        tips.value.splice(index, 1);
      }
    }, 8000);
  }
}

function closeTip(index) {
  if (index !== -1) {
    tips.value.splice(index, 1);
  }
}

onMounted(async () => {
    await KFVStore.fetchKFV();
})
</script>
<style></style>