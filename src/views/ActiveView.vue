<template>
  <div>
    <div class="grid grid-cols-2 gap-6">
      <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
        <Line :options="LineOptions" :data="line" />
      </div>

      <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
        <Bar :options="barOptions" :data="bar" />
      </div>

      <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
        <Bar :options="barOptionsTurnedTwo" :data="barTurnedTwo" />
      </div>

      <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
        <Bar :options="barOptionsTurned" :data="barTurned" />
      </div>
    </div>
  </div>

</template>



<script>
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js'
  import {
    Line
  } from 'vue-chartjs'
  import {
    Bar
  } from 'vue-chartjs';
  import * as charts from '@/charts/charts.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  export default {
    name: 'App',
    components: {
      Line,
      Bar
    },
    data() {
      return charts
    }
  }
</script>

<style>

</style>