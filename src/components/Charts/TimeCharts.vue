<template>
    <div class="container min-h-[100%]">
        <div v-if="mode === 'GeneralInformation'">
            <div class="grid grid-cols-2 gap-6">

                <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                    <Bar :options="lineOptionsTwo" :data="lineTwo" />
                </div>

                <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                    <Doughnut :options="doughnutOptions" :data="Doughnut" />
                </div>

                <div class="flex justify-between gap-10 drop-shadow-2xl rounded-2xl px-6 py-3.5 bg-white">

                    <div class="flex flex-col justify-between">
                        <h2 class="text-2xl">Простои организационные</h2>
                        <div class="flex flex-col">
                            <p>План 2024 г.:98%</p>
                            <div class="bg-[#3d3db6] h-2 w-full mt-1"></div>
                        </div>
                    </div>

                    <div class="flex flex-col items-end">
                        <div class="h-24 w-40 border border-slate-500"></div>
                        <div class="flex gap-5 items-center mt-2">
                            <p>За 3 года:</p>
                            <span class=" bg-gray-200 p-0.5">+32%</span>
                        </div>
                    </div>
                </div>


                <div>
                    <div class="flex justify-between gap-10 drop-shadow-2xl rounded-2xl px-6 py-3.5 bg-white">

                        <div class="flex flex-col justify-between">
                            <h2 class="text-2xl">Простои аварийные</h2>
                            <div class="flex flex-col">
                                <p>План 2024 г.:98%</p>
                                <div class="bg-purple-500 h-2 w-full mt-1"></div>
                            </div>
                        </div>

                        <div class="flex flex-col items-end">
                            <div class="h-24 w-40 border border-slate-500"></div>
                            <div class="flex gap-5 items-center mt-2">
                                <p>За 3 года:</p>
                                <span class=" bg-gray-200 p-0.5">+32%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div v-else-if="mode === 'DynamicStructure'">
            <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white mx-auto mt-10">
                <Line :options="ChangingOpeningHoursOptions" :data="ChangingOpeningHours" />
            </div>

            <div class="grid grid-cols-2 gap-6 mt-10">
                <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                    <Line :options="ScatterOptions" :data="Scatter" />
                </div>
                <div class="drop-shadow-2xl rounded-2xl block px-6 py-3.5 bg-white">
                    <Line :options="ScatterTwoOptions" :data="ScatterTwo" />
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
    } from 'vue-chartjs'
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
        Legend,
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
<style>

</style>