<template>
    <div v-if="mode === 'GeneralInformation'">
        <div>
            <DateKtg />
        </div>
        <div class="grid grid-cols-2 gap-6 mt-10">
            <div class="element-chart">
                <Bar :options="KAWFACTOptions" :data="KAWFACT" />
            </div>

            <div class="element-chart">
                <Bar :options="MTBFOptions" :data="MTBF" />
            </div>

            <div class="element-chart">
                <Bar :options="MTTFOptions" :data="MTTF" />
            </div>

            <div class="element-chart">
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
