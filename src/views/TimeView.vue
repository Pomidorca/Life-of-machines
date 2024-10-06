<template>
  <div>
    <ChartsView :mode="mode" />
  </div>
</template>


<script>
import ChartsView from '@/components/Charts/TimeCharts.vue'; 

export default {
  name: 'TimeView',
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
