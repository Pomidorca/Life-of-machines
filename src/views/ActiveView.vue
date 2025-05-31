<template>
  <div class="flex flex-col h-full">
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