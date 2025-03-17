<template>
  <div class="flex flex-col h-full">
<!--    <div class="flex flex-col gap-y-4">-->
<!--      <div>-->
<!--        <div class="p-1 bg-[#F2F2F2] inline-flex rounded-2xl">-->
<!--          <router-link-->
<!--            class="py-2 px-4 rounded-2xl text-center text-[#979DAC] font-semibold text-xl leading-5 uppercase"-->
<!--            :class="{ 'text-[white] bg-[#0554F2]': !$route.query.mode || $route.query.mode === 'GeneralInformation' }"-->
<!--            :to="{ name: $route.name, params: { pageName: $route.params.pageName }, query: { mode: 'GeneralInformation' } }">-->
<!--            Структура парка-->
<!--          </router-link>-->
          <!-- <router-link
            class="py-2 px-4 rounded-2xl text-center text-[#979DAC] font-semibold text-xl leading-5 uppercase"
            :class="{ 'text-[white] bg-[#0554F2]': $route.query.mode === 'DynamicStructure' }"
            :to="{ name: $route.name, params: { pageName: $route.params.pageName }, query: { mode: 'DynamicStructure' } }">
            Параметры парка
            </router-link>   -->
<!--        </div>-->
<!--      </div>-->
<!--      <TheServiceLife />-->
<!--    </div>-->
    <div class="wrapper-content-charts">
      <ChartsView :mode="mode" />
    </div>
  </div>
</template>

<script setup>
import ChartsView from '@/components/Charts/Active/ActiveCharts.vue';
import TheServiceLife from '@/components/TheServiceLife.vue';
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const mode = computed(() => route.query.mode || 'GeneralInformation');

watch(mode)

</script>