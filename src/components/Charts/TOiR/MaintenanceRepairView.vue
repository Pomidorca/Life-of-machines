<template>
  <div>
    <div v-if="mode === 'GeneralInformation'">
      <div v-if="loading" class="wrapper-loader">
        <span class="loader"></span>
      </div>
      <div v-else-if="error">Ошибка: {{ error }}</div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </div>

    <div v-else-if="mode === 'DynamicStructure'">
      <div v-if="loading" class="wrapper-loader">
        <span class="loader"></span>
      </div>
      <div v-else-if="error">Ошибка: {{ error }}</div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="col-span-2 drop-shadow-2xl rounded-2xl block px-6 bg-white">
          <Bar :options="NumberOfRefundsOptions" :data="NumberOfRefunds" />
        </div>
        <div ref="breakdownsChartContainer"  class="element-chart col-span-1 drop-shadow-2xl rounded-2xl block px-6 bg-white" :style="{ height: breakdownsChartHeight + 'px' }" style="max-height: 1000px">
          <Bar :options="NumberOfBreakdownsByFaultNameOptions" :data="NumberOfBreakdownsByFaultName" />
        </div>
        <div ref="breakdownsChartContainer"  class="element-chart col-span-1 drop-shadow-2xl rounded-2xl block px-6 bg-white">
          <Bar :options="OrganizationOfRepairsOptionsSecond" :data="OrganizationOfRepairsSecond" />
        </div>
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
import ChartJSPluginDatalabels from 'chartjs-plugin-datalabels';
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
    ChartJSPluginDatalabels,
    {
      /**
       * arrow component for charts
       */
      id: 'arrowIconPlugin',
      beforeDatasetDraw(chart, args, options) {
        if (chart.config._config.options.id !== 'actualAccidentRateChart') return;

        const {ctx, chartArea: {top, bottom, left, right}} = chart;
        const meta = chart.getDatasetMeta(0);

        meta.data.forEach((bar, index) => {
          const x = bar.x;
          const yTop = top + 10;
          const yBottom = bar.y;
          const barWidth = bar.width;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, yTop);
          ctx.lineTo(x, yBottom);
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgb(248,34,34)';
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(x, yBottom);
          ctx.lineTo(x - 5, yBottom - 10);
          ctx.lineTo(x + 5, yBottom - 10);
          ctx.closePath();
          ctx.fillStyle = 'rgba(248,34,34)';
          ctx.fill();

          ctx.save();
          ctx.beginPath();
          ctx.rect(x - barWidth/2, top, barWidth, 10); // x, y, width, height
          ctx.fillStyle = 'rgb(128,221,78)';
          ctx.fill();
          ctx.restore();

          ctx.restore();
        });
      }
    }
)

import { useTOIRStore } from "@/store/toir.js";
import {NumberOfBreakdownsByFaultName, NumberOfBreakdownsByFaultNameOptions} from "@/components/Charts/TOiR/index.js";


export default {
  name: 'TOIR',
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
    return {
      ...charts,
      toirStore: null,
    }
  },
  created() {
    this.toirStore = useTOIRStore()
  },
  computed: {
    NumberOfBreakdownsByFaultNameOptions() {
      return NumberOfBreakdownsByFaultNameOptions
    },
    NumberOfBreakdownsByFaultName() {
      return NumberOfBreakdownsByFaultName
    },
    loading() {
      return this.toirStore.loading;
    },
    error() {
      return this.toirStore.error;
    },
    breakdownsChartHeight() {
      return this.toirStore.breakdownsChartHeight
    }
  },
  mounted() {
    this.toirStore.fetchData()
  }
}
</script>