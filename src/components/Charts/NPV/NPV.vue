<template>
    <div>
        <div v-if="mode === 'GeneralInformation'">

            <div class="grid grid-cols-2 items-start gap-6">
                <div class="block drop-shadow-2xl bg-white rounded-2xl p-5">
                    <h2 class="text-center text-xl font-semibold leading-6 text-[#001233]">Структура капитальных затрат
                    </h2>
                    <div class="flex flex-col gap-y-5 mt-3">
                        <div class="flex px-6 py-3.5 bg-white justify-center items-center gap-x-4">
                            <img src="/img/tech/Frame24.png" alt="" width="100px" height="100px">
                            <Bar :options="strategyOptions" :data="strategy" />
                        </div>

                        <div class=" flex px-6 py-3.5 bg-white justify-center items-center gap-x-4">
                            <img src="/img/tech/Frame25.png" alt="" width="100px" height="100px">
                            <Bar :options="strategyTwoOptions" :data="strategyTwo" />
                        </div>

                        <div class=" flex px-6 py-3.5 bg-white justify-center items-center gap-x-4">
                            <img src="/img/tech/Frame26.png" alt="" width="100px" height="100px">
                            <Bar :options="strategyThreeOptions" :data="strategyThree" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-y-6">
                    <div class="drop-shadow-2xl rounded-2xl flex px-6 py-3.5 bg-white justify-center">
                        <Line :options="CurrentStrategyOptions" :data="CurrentStrategy" />
                    </div>

                    <div class="drop-shadow-2xl rounded-2xl flex px-6 py-3.5 bg-white justify-center">
                        <Line :options="CurrentStrategyTwoOptions" :data="CurrentStrategyTwo" />
                    </div>
                </div>
            </div>

            <div class="drop-shadow-2xl rounded-2xl flex px-6 py-3.5 bg-white justify-center mt-10">
                <Line :options="PresentValueOptions" :data="PresentValue" />
            </div>


        </div>


        <div v-if="mode === 'DynamicStructure'">
            <div class="grid grid-cols-2 gap-6 start">

                <div class="relative drop-shadow-2xl rounded-2xl flex flex-col items-center px-6 py-3.5 bg-white">
                    <Bar :options="ChDDOptions" :data="ChDD" />
                    <span
                        class="absolute top-14 text-center text-xl font-semibold leading-4 rounded-3xl bg-emerald-700 text-white px-2 py-0.5 border border-black mt-2">+9806</span>
                </div>

                <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                    <BoundaryConditionsForNPV />
                </div>
            </div>

            <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white mt-10">
                <ChDDTableForNPV />
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
    Line,
    Doughnut,
    Bar
} from 'vue-chartjs'
import * as charts from '@/components/Charts/NPV/index.js';
import StrategiesForNPV from '@/components/StrategiesForNPV.vue'
import BoundaryConditionsForNPV from '@/components/BoundaryConditionsForNPV.vue';
import ChDDTableForNPV from '@/components/ChDDTableForNPV.vue';

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
        StrategiesForNPV,
        BoundaryConditionsForNPV,
        ChDDTableForNPV
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