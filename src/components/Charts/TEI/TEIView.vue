<template>
  <div>
    <div v-if="mode === 'GeneralInformation'">
      <div class="grid grid-cols-1 gap-6">
        <div v-if="loading">Загрузка...</div>
        <div v-else-if="error">Ошибка: {{ error }}</div>
        <div v-else>
          <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
            <Bar :options="CarryingOutVolumesOptions" :data="CarryingOutVolumes" />
          </div>

          <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
            <Bar :options="DynamicsUnitCostsOptions" :data="DynamicsUnitCosts" />
          </div>
        </div>


      </div>
    </div>



    <div v-else-if="mode === 'DynamicStructure'">
      <div v-if="loading">Загрузка...</div>
      <div v-else-if="error">Ошибка: {{ error }}</div>
      <div v-else class="grid grid-cols-2 gap-6">
        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white mt-10" style="min-height: 400px">
          <Bar :options="DynamicsUnitCostsTwoOptions" :data="DynamicsUnitCostsTwo" />
        </div>
        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white mt-10">
          <Radar :options="StructureKFVOptions" :data="StructureKFV" />
        </div>
      </div>
    </div>

    <div v-else-if="mode === 'analysis'">
      <div v-if="loading">Загрузка...</div>
      <div v-else-if="error">Ошибка: {{ error }}</div>
      <div v-else>
        <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white mt-10">
          <Bar :options="CostStructureOptions" :data="CostStructure" />
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white mt-10">
            <Line :options="DynamicsSpecificAccumulatedOptions" :data="DynamicsSpecificAccumulated" />
          </div>
          <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white mt-10">
            <Line :options="DynamicsUnitCostsThreeOptions" :data="DynamicsUnitCostsThree" />
          </div>
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
import {StructureKFVOptions} from "@/components/Charts/KFV/index.js";
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
    this.tepStore.fetchTEP(this.toggle)
  }
}
</script>