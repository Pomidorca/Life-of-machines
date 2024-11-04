<template>
  <div>
    <div v-if="mode === 'GeneralInformation'">

      <div class="grid grid-cols-2 gap-6">

        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
          <Line :options="LineOptions" :data="line" />
        </div>

        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
          <Line :options="changeStructureOptions" :data="changeStructure" />
        </div>


        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
          <Bar :options="barOptionsTurnedTwo" :data="barTurnedTwo" />
        </div>

        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
          <Bar :options="barOptionsTurned" :data="barTurned" />
        </div>

      </div>

    </div>
    <div class="container" v-else-if="mode === 'DynamicStructure'">
  <div class=" text-center">
    <span class="text-xl text-[#001233] font-semibold leading-6">Распределение парка <br> оборудования по видам работ</span>
  </div>
      <div class="drop-shadow-2xl rounded-2xl flex px-6 py-3.5 bg-white justify-center mt-3">
        <TableForSTR />
      </div>

      <p class="flex gap-x-4 items-center text-xl text-[#001233] font-semibold leading-6 mt-12">Кол-во оборудования,
        выполнившее свой ресурс<span
          class="py-2 px-4 bg-[#FF0000] text-white font-medium leading-5 rounded-lg">2 ед.</span></p>
    </div>
  </div>

</template>

<script>
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
  import * as charts from '@/components/Charts/Active/index.js';
  import TableForSTR from '@/components/TableForSTR.vue';

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

  export default {
    name: 'ChartsView',
    components: {
      Line,
      Bar,
      TableForSTR
    },
    props: {
      mode: {
        type: String,
        default: 'GeneralInformation'
      },
    },
    data() {
      return charts
    }
  };
</script>