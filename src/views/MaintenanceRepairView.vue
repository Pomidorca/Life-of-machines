<template>
  <div class="flex flex-col">
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