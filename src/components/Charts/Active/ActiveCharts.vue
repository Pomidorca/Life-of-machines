<template>
  <div>
    <div v-if="mode === 'GeneralInformation'">
      <div v-if="loading">Загрузка...</div>
      <div v-else-if="error">Ошибка: {{ error }}</div>
      <div v-else class="grid grid-cols-2 gap-6">
        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
          <Line v-if="lineDate.value && lineDate.value.datasets && lineDate.value.datasets.length > 0"
            :options="LineOptions" :data="lineDate.value" />
        </div>
        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
          <Line :options="changeStructureOptions" :data="changeStructureData" />
        </div>
        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
          <Bar :options="barOptionsTurnedTwo" :data="barTurnedTwoData" />
        </div>
        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
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

const loading = computed(() => activeStore.loading);
const error = computed(() => activeStore.error);

const lineDate = computed(() => activeStore.lineDate);
const changeStructureData = computed(() => activeStore.changeStructureDate);
const barTurnedData = computed(() => activeStore.barTurnedDate);
const barTurnedTwoData = computed(() => activeStore.barTurnedTwoDate);



console.log('Данные для графика', LineOptions.value)
onMounted(async () => {
  await activeStore.fetchData();
  console.log(lineDate.value.datasets);

});
</script>