<template>
    <div v-if="mode === 'GeneralInformation'">
        <div>
            <DateKtg />
        </div>
        <div class="grid grid-cols-2 gap-6 mt-10">
            <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                <Bar :options="KAWFACTOptions" :data="KAWFACT" />
            </div>

            <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                <Bar :options="MTBFOptions" :data="MTBF" />
            </div>

            <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                <Bar :options="MTTFOptions" :data="MTTF" />
            </div>

            <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                <Bar :options="ProbabilityOperationOptions" :data="ProbabilityOperation" />
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
        DateKtg
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
