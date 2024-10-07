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
      <div class="drop-shadow-2xl rounded-2xl px-6 py-3.5 bg-white mb-10">
        <div class="flex flex-col gap-5 min-[1620px]:flex-row">
          <div>
            <h2 class="py-1 px-1 w-full bg-[#91cf4e] mb-3 text-white">Текущее состояние:</h2>
            <DataTable :value="currentState" showGridlines tableStyle="min-width: 34rem">
              <Column class="" field="Group" header="Группа"></Column>

              <Column header="Оборудование">
                <template #body="slotProps">
                  <div class="ml-3" v-for="equipment in slotProps.data.Equipment" :key="equipment.name">
                    {{ equipment.name }}
                  </div>
                </template>
              </Column>

              <Column class="" header="Ввод">
                <template #body="slotProps">
                  <div class="text-center" v-for="equipment in slotProps.data.Enter" :key="equipment.year">
                    {{ equipment.year }}
                  </div>
                </template>
              </Column>

              <Column header="Наработка">
                <template #body="slotProps">
                  <div class="text-center" v-for="equipment in slotProps.data.OperatingTime" :key="equipment.time">
                    {{ equipment.time }}
                  </div>
                </template>
              </Column>

            </DataTable>
          </div>

          <div>
            <h2 class="py-1 px-1 w-full bg-[#db752d] mb-3 text-white">Целевое состояние:</h2>
            <DataTable :value="equipmentData" class="p-datatable-gridlines"
              tableStyle="min-width: 45rem; min-height: 10.7rem">
              <Column field="name" header="Оборудование"></Column>
              <Column v-for="year in years" :key="year" :header="year.toString()">
                <template #body="slotProps">
                  <span v-if="year >= slotProps.data.startYear && year <= slotProps.data.endYear">
                    X
                  </span>
                </template>
              </Column>
            </DataTable>
          </div>
          <div>

          </div>

        </div>
      </div>
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
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import ColumnGroup from 'primevue/columngroup';
  import Row from 'primevue/row';
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
      Doughnut,
      DataTable,
      Column
    },
    props: {
      mode: String,
      default: 'GeneralInformation'
    },
    data() {
      return {
        ...charts,
        equipmentData: [{
            name: 'RH-340',
            startYear: 2025,
            endYear: 2029
          },
          {
            name: 'Terex RH-340 №091',
            startYear: 2025,
            endYear: 2029
          },
          {
            name: 'Komatsu PC-5500 №099',
            startYear: 2027,
            endYear: 2029
          },
          {
            name: 'Komatsu PC-3000',
            startYear: 2027,
            endYear: 2029
          },
        ],
        years: [2024, 2025, 2026, 2027, 2028, 2029],

        currentState: [{
            Group: 'Vковш - 25м',
            Equipment: [{
                name: 'Terex RH-340 №091'
              },
              {
                name: 'Komatsu PC-5500 №099'
              },
              {
                name: 'Komatsu PC-5500 №0128'
              }
            ],
            Enter: [{
                year: '2010'
              },
              {
                year: '2011'
              },
              {
                year: '2013'
              }
            ],
            OperatingTime: [{
                time: '-'
              },
              {
                time: 2011
              },
              {
                time: 2013
              }
            ]

          },
          {
            Group: 'Vковш - 15м',
            Equipment: [{
                name: 'Komatsu PC-3000 №00244'
              },
              {
                name: 'Komatsu PC-3000 №027'
              },
              {
                name: 'Komatsu PC-3000 №382'
              }
            ],
            Enter: [{
                year: '2013'
              },
              {
                year: '2017'
              },
              {
                year: '2022'
              }
            ],
            OperatingTime: [{
                time: 2013
              },
              {
                time: 2017
              },
              {
                time: 2022
              }
            ]

          },
        ],
        inputCharts: [{

        }]
      };
    }
  }
</script>