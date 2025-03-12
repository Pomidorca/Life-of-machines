<template>
  <div class="flex flex-col">
<!--    <div class="flex flex-col gap-y-4">-->
<!--      <div>-->
<!--        <div class="p-1 bg-[#F2F2F2] inline-flex rounded-2xl">-->
<!--          <router-link-->
<!--            class="py-2 px-4 rounded-2xl text-center text-[#979DAC] font-semibold text-xl leading-5 uppercase"-->
<!--            :class="{ 'text-[white] bg-[#0554F2]': !$route.query.mode || $route.query.mode === 'GeneralInformation' }"-->
<!--            :to="{ name: $route.name, params: { pageName: $route.params.pageName }, query: { mode: 'GeneralInformation' } }">-->
<!--            производительность-->
<!--          </router-link>-->
<!--          <router-link-->
<!--            class="py-2 px-4 rounded-2xl text-center text-[#979DAC] font-semibold text-xl leading-5 uppercase"-->
<!--            :class="{ 'text-[white] bg-[#0554F2]': $route.query.mode === 'DynamicStructure' }"-->
<!--            :to="{ name: $route.name, params: { pageName: $route.params.pageName }, query: { mode: 'DynamicStructure' } }">-->
<!--            затраты-->
<!--          </router-link>-->
<!--          <router-link-->
<!--            class="py-2 px-4 rounded-2xl text-center text-[#979DAC] font-semibold text-xl leading-5 uppercase"-->
<!--            :class="{ 'text-[white] bg-[#0554F2]': $route.query.mode === 'analysis' }"-->
<!--            :to="{ name: $route.name, params: { pageName: $route.params.pageName }, query: { mode: 'analysis' } }">-->
<!--            анализ-->
<!--          </router-link>-->
<!--        </div>-->
<!--      </div>-->
<!--      <TheServiceLife />-->
<!--    </div>-->
    <div class="">
      <ChartsView :mode="mode" :toggle="toggle"/>
    </div>
  </div>
</template>


<script>
import ChartsView from '@/components/Charts/TEI/TEIView.vue';
import TEPDataService from "@/services/TEPDataService.js";

export default {
  components: {
    ChartsView
  },
  data() {
    return {
      mode: 'GeneralInformation',
      toggle: 'year'
    };
  },
  created() {
    this.mode = this.$route.query.mode || 'GeneralInformation';
    this.toggle = this.$route.query.toggle || 'year';
  },
  watch: {
    '$route.query.mode': {
      handler(newMode) {
        this.mode = newMode || 'GeneralInformation';
      },
      immediate: true
    },
    '$route.query.toggle': {
      handler(newMode) {
        this.toggle = newMode || 'year';
      },
      immediate: true
    },
  }
}
</script>