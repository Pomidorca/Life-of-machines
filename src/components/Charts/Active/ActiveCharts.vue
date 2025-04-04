<template>
  <div>
    <div v-if="mode === 'GeneralInformation'">
      <div v-if="loading" class="wrapper-loader">
        <span class="loader"></span>
      </div>
      <div v-else-if="error">Ошибка: {{ error }}</div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="element-chart" style="height:40vh;">
          <Line :options="LineOptions" :data="lineDate" />
        </div>
        <div class="element-chart">
          <Line :options="changeStructureOptions" :data="changeStructureData" />
        </div>
        <div class="element-chart">
          <Bar :options="barOptionsTurnedTwo" :data="barTurnedTwoData" />
        </div>
        <div class="element-chart">
          <Bar :options="barOptionsTurned" :data="barTurnedData" />
        </div>
      </div>


    </div>
    <div class="container" v-else-if="mode === 'DynamicStructure'">
      <div class=" text-center">
        <span class="text-xl text-[#001233] font-semibold leading-6">Распределение парка <br> оборудования по видам
          работ</span>
      </div>
      <div class="drop-shadow-2xl rounded-2xl flex px-6 py-3.5 bg-white justify-center mt-3">
        <TableForSTR />
      </div>

      <p class="flex gap-x-4 items-center text-xl text-[#001233] font-semibold leading-6 mt-12">Кол-во оборудования,
        выполнившее свой ресурс<span class="py-2 px-4 bg-[#FF0000] text-white font-medium leading-5 rounded-lg">2
          ед.</span></p>
    </div>
  </div>

</template>

<script setup>
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  Filler
} from 'chart.js';
import {
  Line,
  Bar
} from 'vue-chartjs';
import { computed, onMounted } from "vue";
import { useActiveStore } from '@/store/active';
import { useKFVStore } from '@/store/kfv';
import TableForSTR from '@/components/TableForSTR.vue';
import { LineOptions } from '@/components/Charts/Active/index.js';
import { changeStructureOptions } from '@/components/Charts/Active/index.js';
import { barOptionsTurned } from '@/components/Charts/Active/index.js';
import { barOptionsTurnedTwo } from '@/components/Charts/Active/index.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const props = defineProps({
  mode: {
    type: String,
    default: 'GeneralInformation'
  }
})
const activeStore = useActiveStore();
const kfvStore = useKFVStore();

const loading = computed(() => activeStore.loading);
const error = computed(() => activeStore.error);

const lineDate = computed(() => activeStore.lineDate);
const changeStructureData = computed(() => activeStore.changeStructureDate);
const barTurnedData = computed(() => activeStore.barTurnedDate);
const barTurnedTwoData = computed(() => activeStore.barTurnedTwoDate);



onMounted(async () => {
  // await activeStore.fetchData();
  await kfvStore.fetchKFV();
});
</script>