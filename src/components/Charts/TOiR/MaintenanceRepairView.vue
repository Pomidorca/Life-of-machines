<template>
  <div class="container">
    <div v-if="mode === 'GeneralInformation'">

      <div class="grid grid-cols-2 gap-6">
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

    <div v-else-if="mode === 'DynamicStructure'">
      <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
        <Doughnut :options="StructureEmergencyDowntimesOptions" :data="StructureEmergencyDowntimes" />
      </div>

      <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white mt-10">
        <Doughnut :options="StructureEmergencyDowntimesOptionsTwo" :data="StructureEmergencyDowntimesTwo" />
      </div>
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
  ScatterController
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
import * as charts from '@/components/Charts/TOiR/index.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ScatterController,
  Title,
  Tooltip,
  Legend,
)

export default {
  name: 'App',
  components: {
    Line,
    Bar,
    Doughnut
  },
  props: {
    mode: String,
    default: 'GeneralInformation'
  },
  data() {
    return charts
  }
}
</script>