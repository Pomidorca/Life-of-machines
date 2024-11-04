<template>
  <div class="flex flex-col">
    <div>
      <ChartsView :mode="mode" />
    </div>
  </div>
</template>



<script>
import ChartsView from '@/components/Charts/KTG/TechnicalCosts.vue';

export default {
  name: 'TechnicalCostsView',
  components: {
    ChartsView
  },
  computed: {
    mode() {
      return this.$route.query.mode || 'GeneralInformation';
    }
  }
}
</script>