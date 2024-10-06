<template>
    <div class="flex flex-col gap-y-10">
        <div v-if="mode === 'GeneralInformation'">
            <div class="grid grid-cols-2 gap-6">
              <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                <Line :options="SpecificFilledTomorrowsOptions" :data="SpecificFilledTomorrows" />
              </div>
              <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                <Line :options="costOptions" :data="cost" />
              </div>
            </div>
        
            <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white mt-10">
              <Bar :options="CostStructureOwningOptions" :data="CostStructureOwning" />
            </div>
        </div>
  
        <div v-else-if="mode === 'DynamicStructure'">
            <div class="grid grid-cols-2 gap-6">
              <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                <Bar :options="strategyOptions" :data="strategy" />
                <Bar :options="strategyOptionsTwo" :data="strategyTwo" />
              </div>
        
              <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                <Line :options="CurrentStrategyOptions" :data="CurrentStrategy" />
                <Line :options="CurrentStrategyOptionsTwo" :data="CurrentStrategyTwo" />
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
      props: {
        mode: String,
        default: 'GeneralInformation'
      },
      data() {
        return charts
      }
    }
  </script>