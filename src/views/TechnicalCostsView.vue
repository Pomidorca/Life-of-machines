<template>
  <div>
    <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
      <Bar :options="RequiredNumberPartsOptions" :data="RequiredNumberParts" />
    </div>
  </div>
</template>
<script>
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
  } from 'chart.js'
  import {
    Line
  } from 'vue-chartjs'
  import {
    Bar
  } from 'vue-chartjs';
  import {
    Doughnut
  } from 'vue-chartjs';
  import * as charts from '@/charts/charts.js';

  ChartJS.register(
    ArcElement,
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
      Bar,
      Doughnut
    },
    data() {
      return charts
    }
  }
</script>