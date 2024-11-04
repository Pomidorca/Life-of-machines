<template>
    <div>
        <div v-if="mode === 'GeneralInformation'">
            <div class="grid grid-cols-1 gap-6">
                
                <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                    <Bar :options="CarryingOutVolumesOptions" :data="CarryingOutVolumes" />
                </div>

                <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                    <Bar :options="DynamicsUnitCostsOptions" :data="DynamicsUnitCosts" />
                </div>


            </div>
        </div>



        <div v-else-if="mode === 'DynamicStructure'">
            <div class="grid grid-cols-2 gap-6">
                <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white mt-10">
                    <Bar :options="DynamicsUnitCostsTwoOptions" :data="DynamicsUnitCostsTwo" />
                </div>
                <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white mt-10">
                    <Radar :options="StructureKFVOptions" :data="StructureKFV" />
                </div>
            </div>
        </div>

        <div v-else-if="mode === 'analysis'">
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
    import * as charts from '@/components/Charts/TEI/index.js';

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