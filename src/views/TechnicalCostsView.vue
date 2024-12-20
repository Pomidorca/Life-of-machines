<template>
  <div class="flex flex-col">
    <div>
      <ChartsView :mode="mode" />
    </div>
  </div>
</template>



<script setup>
import ChartsView from '@/components/Charts/KTG/TechnicalCosts.vue';
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const mode = computed(() => route.query.mode || 'GeneralInformation');

watch(mode)
</script>