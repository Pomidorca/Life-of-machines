<template>
    <div class="px-6 py-10 bg-[#F2F2F2] min-h-[100%] max-w-[302px]">
        <div class="flex items-center gap-2 bg-white rounded-xl px-4 py-3.5 text-[#979DAC]">
            <input class="w-[238px] outline-none" type="text" placeholder="Поиск">
            <button><img src="/public/img/filter/Search_Magnifying_Glass.svg"></button>
        </div>


        <div class="mt-5">
            <h4 class="text-xl text-[#001233] leading-5 font-medium">Вид машин</h4>
            <div class="flex relative">
                <button class="absolute top-1/2 -translate-y-1/2 right-2 z-10 " @click="scrollRight"><img
                        src="/public/img/filter/Frame 16.svg" alt=""></button>
                <button class="absolute top-1/2 -translate-y-1/2 left-2 z-10 " @click="scrollLeft"><img
                        src="/public/img/filter/Frame 34.svg" alt=""></button>
                <div class="flex gap-x-5 mt-3 overflow-x-auto snap-none max-w-[302px] relative scroll-container cursor-pointer"
                    ref="scrollContainer">
                    <CardTechnique @selectTechnique="selectTechnique" />
                </div>
            </div>
        </div>

        <div class="mt-9">
            <h3 class="text-xl text-[#001233] font-medium leading-6">Оборудование</h3>
            <div class="h-56 overflow-y-auto px-4 py-3 bg-white mt-3 rounded-lg drop-shadow-lg">
                <Equipment />
            </div>
        </div>


        <div class="mt-5">
            <div class="flex items-center gap-x-3">
                <label class="checkbox cursor-pointer" for="checkbox">
                    <input class="checkbox__inp" type="checkbox" id="checkbox" v-model="isChecked"
                        @change="handleCheckboxChange">
                    <span class="checkbox__inner">Динамика структуры <br> и параметры парка</span>
                </label>
            </div>
        </div>


        <div class="mt-5">
            <h2 class="text-xl text-[#001233] font-medium leading-6">Срок службы</h2>
            <div class="flex flex-col mt-3 gap-y-3 ">
                <input type="range">
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
    import router from '@/router';
    import CardTechnique from './CardsTechnique.vue';
    import Equipment from './Equipment.vue';
    import {
        ref
    } from 'vue';
    import {
        useStore
    } from "vuex";
    import {
        useRoute
    } from 'vue-router';



    const route = useRoute();
    const scrollContainer = ref(null);
    const isChecked = ref(false);
    const store = useStore();

    const handleCheckboxChange = () => {
        if (isChecked.value === true) {
            router.push('/DynamicsStructure')
        } else {
            router.push('/active')
        }
    }

    const selectTechnique = (technique) => {
        store.commit("selectTechnique", technique);
    };

    const scrollRight = () => {
        if (scrollContainer.value) {
            scrollContainer.value.scrollLeft += 100;
        }
    };

    const scrollLeft = () => {
        if (scrollContainer.value) {
            scrollContainer.value.scrollLeft -= 100;
        }
    };
</script>
<style scoped>
    .scroll-container {
        scrollbar-width: none;
    }

    .scroll-container::-webkit-scrollbar {
        display: none;
    }

    .checkbox {
        display: inline-block;
    }

    .checkbox__inp {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        appearance: none;
    }

    .checkbox__inner {
        display: flex;
        align-items: center;
        position: relative;
        font-size: 18px;
        line-height: 24px;
        font-weight: 500;
        color: #001233;
        padding: 8px;
        padding-left: 70px;
    }

    .checkbox__inner::before {
        margin-top: 15px;
        display: block;
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 64px;
        height: 32px;
        border-radius: 18px;
        background-color: white;
        transition: all 0.3s ease;
    }

    .checkbox__inner::after {
        margin-top: 15px;
        display: block;
        content: "";
        position: absolute;
        width: 26px;
        height: 26px;
        border-radius: 15px;
        left: 3px;
        top: 3px;
        background-color: #0554f2;
        transition: all 0.3s ease;
    }

    .checkbox__inp:checked+.checkbox__inner::before {
        background-color: #979DAC;
    }

    .checkbox__inp:checked+.checkbox__inner::after {
        background-color: white;
        left: 35px;
    }
</style>