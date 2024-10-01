<template>
  <div class="container">
    <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
      <Doughnut :options="StructureEmergencyDowntimesOptions" :data="StructureEmergencyDowntimes" />
    </div>

    <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white mt-10">
      <Doughnut :options="StructureEmergencyDowntimesOptionsTwo" :data="StructureEmergencyDowntimesTwo" />
    </div>

    <div class="grid grid-cols-2 gap-6 mt-10">
      <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
        <Bar :options="ActualAccidentRateOptions" :data="ActualAccidentRate" />
      </div>

      <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
        <Bar :options="OrganizationOfRepairsOptions" :data="OrganizationOfRepairs" />
      </div>

      <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
        <Bar :options="WorkPlanningIndicatorOptions" :data="WorkPlanningIndicator" />
      </div>

      <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
        <Bar :options="TotalEmergencyDowntimeOptions" :data="TotalEmergencyDowntime" />
      </div>
    </div>

    <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white mt-10">
      <Bar :options="MeanTimeBetweenFailuresOptions" :data="MeanTimeBetweenFailures" />
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