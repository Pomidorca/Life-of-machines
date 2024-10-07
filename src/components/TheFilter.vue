<template>
    <div class="px-6 py-10 bg-[#F2F2F2] min-h-[100%] max-w-[302px]">
        <div>
            <h3 class="text-xl text-[#001233] font-medium leading-6">Оборудование</h3>
            <div class="h-80 overflow-y-auto px-4 py-3 bg-white mt-3 rounded-lg drop-shadow-lg">
                <Equipment />
            </div>
        </div>


        <div class="mt-5">
            <h5 class="text-xl text-[#001233] font-medium leading-6">Динамика структуры и параметры парка</h5>
            <div class="flex flex-col mt-3 gap-y-2">
                <router-link
                    class="w-full py-3 rounded-lg text-center text-[#979DAC] font-medium text-xl leading-5 bg-white"
                    :class="{ 'text-[blue]': !$route.query.mode || $route.query.mode === 'GeneralInformation' }" 
                    :to="{ name: $route.name, params: { pageName: $route.params.pageName }, query: { mode: 'GeneralInformation' }}">
                    Общие сведения
                </router-link>
                <router-link
                    class="w-full py-3 rounded-lg text-center text-[#979DAC] font-medium text-xl leading-5 bg-white"
                    :class="{ 'text-[blue]': $route.query.mode === 'DynamicStructure' }"
                    :to="{ name: $route.name, params: { pageName: $route.params.pageName }, query: { mode: 'DynamicStructure' }}">
                    Динамика структуры
                </router-link>
            </div>
        </div>


        <div class="mt-5">
            <h2 class="text-xl text-[#001233] font-medium leading-6">Срок службы</h2>
            <div class="flex flex-col mt-3 gap-y-3 ">
                <!-- <input type="range"> -->
                <div class="flex gap-x-3">
                    <div>
                        <p class="text-xl leading-6 text-[#001233]">От</p>
                        <input class='mt-2 bg-[#F2F2F2]' type="date">
                    </div>
                    <hr>
                    <div>
                        <p class="text-xl leading-6 text-[#001233]">До</p>
                        <input class='mt-2 bg-[#F2F2F2]' type="date">
                    </div>
                </div>
                <button
                    class="py-3 bg-[#0554F2] text-white text-2xl leading-5 font-medium rounded-lg hover:bg-[#2905f2] duration-300">Весь
                    период</button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import Equipment from './Equipment.vue';
</script>