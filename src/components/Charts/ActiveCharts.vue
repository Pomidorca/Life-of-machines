<template>
  <div>
    <div v-if="mode === 'GeneralInformation'">

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
    <div class="container" v-else-if="mode === 'DynamicStructure'">
      <div class="drop-shadow-2xl rounded-2xl px-6 py-3.5 bg-white">
        <h2 class="text-center text-xl font-medium text-[#001233]">Динамика структуры и параметры парка оборудования
        </h2>
        <div class="flex gap-x-5 mt-5">
          <div>
            <h2 class="py-1 px-1 w-full bg-[#91cf4e] mb-3 text-white">Текущее состояние:</h2>
            <DataTable :value="currentState" showGridlines tableStyle="min-width: 30rem">
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
            <h2 class="py-1 px-1 w-full bg-[#db752d] mb-3 text-white">Графки ввода:</h2>
            <DataTable :value="equipmentData" class="p-datatable-gridlines" tableStyle="min-width: 40rem; min-height: 10rem">
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
    CategoryScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LinearScale
  } from 'chart.js';
  import {
    Line
  } from 'vue-chartjs';
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
  );

  export default {
    name: 'ChartsView',
    components: {
      Line,
      Bar,
      DataTable,
      Column
    },
    props: {
      mode: {
        type: String,
        default: 'GeneralInformation'
      },
    },
    data() {
      return {
        ...charts,
        equipmentData: [{
            name: 'RH-340',
            startYear: 2018,
            endYear: 2023
          },
          {
            name: 'Komatsu PC-5500',
            startYear: 2019,
            endYear: 2023
          },
          {
            name: 'Komatsu PC-3000',
            startYear: 2020,
            endYear: 2021
          },
          {
            name: 'Komatsu PC-3000',
            startYear: 2020,
            endYear: 2021
          },
        ],
        years: [2018, 2019, 2020, 2021, 2022, 2023],

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
                year: '2018'
              },
              {
                year: '2018'
              },
              {
                year: '2019'
              }
            ],
            OperatingTime: [{
                time: 123.564
              },
              {
                time: 17.425
              },
              {
                time: 45.879
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
                year: '2018'
              },
              {
                year: '2020'
              },
              {
                year: '2022'
              }
            ],
            OperatingTime: [{
                time: 456.785
              },
              {
                time: 325.025
              },
              {
                time: 14.258
              }
            ]

          },
        ],
        inputCharts: [{

        }]
      };
    }
  };
</script>