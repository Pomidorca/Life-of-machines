<template>
  <div>
    <ChartsView :mode="mode" /> 
  </div>
</template>

<script>
import ChartsView from '@/components/Charts/ActiveCharts.vue'; 

export default {
  name: 'ActiveView', 
  components: {
    ChartsView 
  },
  computed: {
    mode() {
      return this.$route.query.mode || 'GeneralInformation'; 
    }
  }
};
</script>
