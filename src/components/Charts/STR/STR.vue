<template>
    <div v-if="mode === 'GeneralInformation'">
        <div class="flex gap-x-4">
            <div class="inline-flex flex-col gap-y-2 max-w-[157px]">
                <button class="px-4 py-1 bg-[#0554F2] text-white text-base font-semibold rounded-lg">Стратегия
                    №1</button>
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

        <div class="flex justify-between items-center mt-6">
            <div class="flex flex-col gap-y-4">
                <p class="flex gap-x-4 items-center text-xl text-[#001233] font-semibold leading-6">Обеспечивается<span
                        class="py-2 px-4 bg-[#5ECC17] text-white font-medium leading-5 rounded-lg">2,5</span></p>
                <p class="flex gap-x-4 items-center text-xl text-[#001233] font-semibold leading-6">Не
                    обеспечивается<span
                        class="py-2 px-4 bg-[#FF0000] text-white font-medium leading-5 rounded-lg">2,8</span></p>
            </div>
            <div class="flex flex-col gap-y-4 mr-10">
                <p class="flex gap-x-4 items-center text-xl text-[#001233] font-semibold leading-6">В работе
                    (наработка)<span
                        class="py-2 px-4 bg-transparent text-[#FF0000] border border-[#FF0000] font-medium leading-5 rounded-lg">0,8м3</span>
                </p>
                <p class="flex gap-x-4 items-center text-xl text-[#001233] font-semibold leading-6">Плановая замена
                    (марка)<span
                        class="py-2 px-4 bg-transparent text-[#0554F2] border border-[#0554F2] font-medium leading-5 rounded-lg">ЭКГ-20</span>
                </p>
            </div>
        </div>

        <div class="grid grid-cols-1 gap-y-4 mt-6">

            <div class="drop-shadow-2xl rounded-2xl flex px-6 py-3.5 bg-white justify-center">
                <Table />
            </div>

            <div class="drop-shadow-2xl rounded-2xl flex px-6 py-3.5 bg-white justify-center">
                <Table />
            </div>

            <div class="drop-shadow-2xl rounded-2xl flex px-6 py-3.5 bg-white justify-center">
                <Table />
            </div>
        </div>

    </div>



    <div v-if="mode === 'DynamicStructure'"></div>
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
import * as charts from '@/components/Charts/KTG/index.js';
import DateKtg from '@/components/DateForKTG.vue';
import Table from '@/components/TableForSTR.vue'

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
        DateKtg,
        Table
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