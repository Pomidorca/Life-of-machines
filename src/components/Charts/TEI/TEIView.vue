<template>
  <div>
    <div v-if="mode === 'GeneralInformation'">
      <div class="grid grid-cols-1 gap-6">
        <div v-if="loading" class="wrapper-loader">
          <span class="loader"></span>
        </div>
        <div v-else-if="error">Ошибка: {{ error }}</div>
        <div v-else>
          <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white mb-5" style="aspect-ratio: 16 / 7;">
            <Bar :options="CarryingOutVolumesOptions" :data="CarryingOutVolumes" />
          </div>

          <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white" style="aspect-ratio: 16 / 7;">
            <Bar :options="DynamicsUnitCostsOptions" :data="DynamicsUnitCosts" />
          </div>
        </div>


      </div>
    </div>



    <div v-else-if="mode === 'DynamicStructure'">
      <div v-if="loading" class="wrapper-loader">
        <span class="loader"></span>
      </div>
      <div v-else-if="error">
        <div class="element-chart">
          <img src="/img/specialСharacters/no-selected.gif" alt=""/>
          Ошибкаsf: {{ error }}
        </div>
      </div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="element-chart col-span-2" style="min-height: 50px; height: auto;">
          <div class="flex">
            <img src="/img/specialСharacters/warning-circle-svgrepo-com.svg" alt=""/>
            <h2 class="tips-title ms-1">
              Примечание:
            </h2>
          </div>
          <hr class="my-2">
          <span class="tips-description">
            Для просмотра графика "Сравнение целевых и фактических удельных затрат" выберите год на графике "Динамика удельных затрат на экскавацию"
          </span>
        </div> 
        <div class="element-chart" style="min-height: 400px">
          <Bar ref="chartRef" :options="DynamicsUnitCostsTwoOptions" :data="DynamicsUnitCostsTwo" @click="handleClickChart"/>
        </div>
        <div v-if="loadingChartStructureKFV">
          <div class="element-chart flex flex-col justify-center item-center">
            <span class="tips-description text-center">
              Загрузка...
            </span>
          </div>
        </div>
        <div v-else-if="errorChartStructureKFV">
          <div class="element-chart flex flex-col justify-center item-center">
            <img src="/img/specialСharacters/no-selected.gif" alt="" style="height: 100px; width: 100px; margin: 0 auto;"/>
            <span class="tips-description text-center mt-5">
              {{ errorChartStructureKFV }}
            </span>
          </div>
        </div>
        <div v-else class="element-chart">
          <div style="min-height: 400px">
            <Radar :options="StructureKFVOptions" :data="StructureKFV" />
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="mode === 'analysis'">
      <div v-if="loading" class="wrapper-loader">
        <span class="loader"></span>
      </div>
      <div v-else-if="error">Ошибка: {{ error }}</div>
      <div v-else сlass="grid grid-cols-2 gap-6">
        <div class="element-chart">
          <Bar :options="CostStructureOptions" :data="CostStructure" />
        </div>
        <div class="element-chart my-6">
          365836
          <Line :options="DynamicsSpecificAccumulatedOptions" :data="DynamicsSpecificAccumulated" />
        </div>
        <div class="element-chart">
          <Line :options="DynamicsUnitCostsThreeOptions" :data="DynamicsUnitCostsThree" />
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
  RadialLinearScale,
} from 'chart.js'
import {
  Line,
  Radar
} from 'vue-chartjs'
import {
  Bar
} from 'vue-chartjs';
import {
  Doughnut
} from 'vue-chartjs';
import {
  CarryingOutVolumes,
  CarryingOutVolumesOptions,
  CostStructure,
  CostStructureOptions,
  DynamicsSpecificAccumulated,
  DynamicsSpecificAccumulatedOptions,
  DynamicsUnitCosts,
  DynamicsUnitCostsOptions, DynamicsUnitCostsThree, DynamicsUnitCostsThreeOptions,
  DynamicsUnitCostsTwo,
  DynamicsUnitCostsTwoOptions,
  StructureKFV
} from '@/components/Charts/TEI/index.js';
import {StructureKFVOptions} from "@/components/Charts/TEI/index.js";
import {useTEPStore} from "@/store/tep.js";


ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    RadialLinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export default {
  name: 'App',
  computed: {
    DynamicsUnitCostsThree() {
      return DynamicsUnitCostsThree
    },
    DynamicsUnitCostsThreeOptions() {
      return DynamicsUnitCostsThreeOptions
    },
    DynamicsSpecificAccumulated() {
      return DynamicsSpecificAccumulated
    },
    DynamicsSpecificAccumulatedOptions() {
      return DynamicsSpecificAccumulatedOptions
    },
    CostStructure() {
      return CostStructure
    },
    CostStructureOptions() {
      return CostStructureOptions
    },
    StructureKFV() {
      return StructureKFV
    },
    StructureKFVOptions() {
      return StructureKFVOptions
    },
    DynamicsUnitCostsTwo() {
      return DynamicsUnitCostsTwo
    },
    DynamicsUnitCostsTwoOptions() {
      return DynamicsUnitCostsTwoOptions
    },
    DynamicsUnitCosts() {
      return DynamicsUnitCosts
    },
    DynamicsUnitCostsOptions() {
      return DynamicsUnitCostsOptions
    },
    CarryingOutVolumes() {
      return CarryingOutVolumes
    },
    CarryingOutVolumesOptions() {
      return CarryingOutVolumesOptions
    },
    loading() {
      return this.tepStore.loading;
    },
    error() {
      return this.tepStore.error;
    },
    loadingChartStructureKFV() {
      return this.tepStore.loadingChartStructureKFV
    },
    errorChartStructureKFV() {
      return this.tepStore.errorChartStructureKFV
    }
  },
  components: {
    Line,
    Bar,
    Doughnut,
    Radar
  },
  props: {
    mode: {
      type: String,
      default: 'GeneralInformation'
    },
    toggle: {
      type: String,
      default: 'year',
      required: true
    }
  },
  data() {
    return {
      tepStore: useTEPStore(),
    }
  },
  mounted() {
    this.tepStore.fetchTEP(this.toggle).then(() => {

      if (this.$refs.chartRef) {

        this.$refs.chartRef.chart.update();

      }
    });
  },
  methods: {
    handleClickChart(event) {

      const chart = this.$refs.chartRef.chart;

      const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);

      if (activePoints.length) {
        const firstPoint = activePoints[0];
        const label = chart.data.labels[firstPoint.index];

        const datasetIndex = firstPoint.datasetIndex;
        this.tepStore.updateChartStructureKFV(label)
      } else {
        console.log('No active points found');
      }
    },


    handleDateClick(label, value) {
      console.log(`Дата: ${label}, Значение: ${value}`);

    }
  }
}
</script>