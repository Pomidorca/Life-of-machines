<template>
  <div>
    <ChartViews :mode="mode" />
  </div>
</template>


<script>
import ChartViews from '@/components/Charts/MaintenanceRepairView.vue';

export default {
  name: 'MaintenanceRepairView',
  components: {
    ChartViews
  },
  computed: {
    mode() {
      return this.$route.query.mode || 'GeneralInformation';
    }
  }
}
</script>