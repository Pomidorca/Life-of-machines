<template>
  <div class="flex flex-col">
    <div class="flex flex-col gap-y-4">
      <div>
        <div class="p-1 bg-[#F2F2F2] inline-flex rounded-2xl">
          <router-link
            class="py-2 px-4 rounded-2xl text-center text-[#979DAC] font-semibold text-xl leading-5 uppercase"
            :class="{ 'text-[white] bg-[#0554F2]': !$route.query.mode || $route.query.mode === 'GeneralInformation' }"
            :to="{ name: $route.name, params: { pageName: $route.params.pageName }, query: { mode: 'GeneralInformation' } }">
            Общие сведения
          </router-link>
          <router-link
            class="py-2 px-4 rounded-2xl text-center text-[#979DAC] font-semibold text-xl leading-5 uppercase"
            :class="{ 'text-[white] bg-[#0554F2]': $route.query.mode === 'DynamicStructure' }"
            :to="{ name: $route.name, params: { pageName: $route.params.pageName }, query: { mode: 'DynamicStructure' } }">
            Динамика структуры
          </router-link>
        </div>
      </div>
      <TheServiceLife />
    </div>
    <ChartViews :mode="mode" />
  </div>
</template>


<script setup>
import ChartViews from '@/components/Charts/TOiR/MaintenanceRepairView.vue';
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute();
const mode = computed(() => route.query.mode || 'GeneralInformation');

watch(mode)


</script>