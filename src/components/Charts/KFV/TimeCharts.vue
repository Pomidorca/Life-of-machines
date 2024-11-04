<template>
    <div class="container min-h-[100%]">
        <div v-if="mode === 'GeneralInformation'">
            <div class="grid grid-cols-2 gap-6">

                <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                    <Line :options="ChangesStructureKFVOptions" :data="ChangesStructureKFV" />
                </div>

                <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                    <Radar :options="StructureKFVOptions" :data="StructureKFV" />
                </div>
            </div>
        </div>



        <div v-else-if="mode === 'DynamicStructure'">
            <div class="grid grid-cols-2 gap-6">
                <div class="flex flex-col gap-y-6">
                    <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                        <Bar :options="detailedStructureCfvOneOptions" :data="detailedStructureCfvOne" />
                    </div>
                    <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                        <Bar :options="detailedStructureCfvTwoOptions" :data="detailedStructureCfvTwo" />
                    </div>
                </div>
                <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                        <Bar :options="detailedStructureCfvThreeOptions" :data="detailedStructureCfvThree" />
                    </div>
            </div>
        </div>

        <div v-else-if="mode === 'analysis'">
            <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                        <Line :options="ChangeOperatingTimeOptions" :data="ChangeOperatingTime" />
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
        ScatterController,
        Filler,
        RadialLinearScale,
    } from 'chart.js'
    import {
        Line,
        Radar,
        Doughnut,
        Bar
    } from 'vue-chartjs'
    import * as charts from '@/components/Charts/KFV/index.js';

    ChartJS.register(
        ArcElement,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        ScatterController,
        RadialLinearScale,
        Title,
        Tooltip,
        Legend,
        Filler,
    )

    export default {
        name: 'App',
        components: {
            Line,
            Bar,
            Doughnut,
            Radar
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
<style>

</style>