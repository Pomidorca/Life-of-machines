<template>
  <div class="flex flex-col gap-y-10">
    <div v-if="mode === 'GeneralInformation'">
      <div class="flex gap-x-4">
        <div class="inline-flex flex-col gap-y-2 max-w-[157px]">
          <button class="px-4 py-1 bg-[#0554F2] text-white text-base font-semibold rounded-lg">Стратегия №1</button>
          <span
            class="px-4 py-1 bg-[#F2F2F2] text-[10px] leading-3 font-medium rounded-lg border border-[#001233] text-center">текущая
            стратегия <br> обслуживания</span>
        </div>
        <div class="inline-flex flex-col gap-y-2 max-w-[157px]">
          <button
            class="px-4 py-1 bg-[#F2F2F2] text-[#979DAC] text-base font-medium rounded-lg border border-[#979DAC]">Стратегия
            №2</button>
          <span
            class="px-4 py-1 bg-[#F2F2F2] text-[#979DAC] text-[10px] leading-3 font-medium rounded-lg border border-[#979DAC] text-center">риск-ориентированный
            <br> подход (роп)</span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6 mt-10">

        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
          <Bar :options="PerformanceChangeOptions" :data="PerformanceChange" />
        </div>

        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
          <Bar :options="ComparisonActualCostsOptions" :data="ComparisonActualCosts" />
        </div>

        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
          <Bar :options="ChangingOpeningHoursOptions" :data="ChangingOpeningHours" />
        </div>

        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
          <Bar :options="ComparisonOperationalOptions" :data="ComparisonOperational" />
        </div>

      </div>
    </div>

    <div v-else-if="mode === 'DynamicStructure'">
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
import * as charts from '@/components/Charts/TCO/index.js';

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
  props: {
    mode: String,
    default: 'GeneralInformation'
  },
  data() {
    return charts
  }
}
</script>