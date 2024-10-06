<template>
  <div>
    <ChartsView :mode="mode" />
  </div>
</template>



<script>
import ChartsView from '@/components/Charts/TEIView.vue';


export default {
  name: 'TEIView',
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