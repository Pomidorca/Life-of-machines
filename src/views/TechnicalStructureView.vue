<template>
 <div>
  <ChartView :mode="mode" />
 </div>
</template>
<script>
import ChartView from '@/components/Charts/TechnicalStructureView.vue';

export default {
  name: 'TechnicalStructureView',
  components: {
    ChartView
  },
  computed: {
    mode() {
      return this.$route.query.mode || 'GeneralInformation';
    }
  }
}
</script>