<template>
  <div class="flex flex-col">
    <div class="flex flex-col gap-y-4">
      <div>
        <div class="p-1 bg-[#F2F2F2] inline-flex rounded-2xl">
          <router-link
            class="py-2 px-4 rounded-2xl text-center text-[#979DAC] font-semibold text-xl leading-5 uppercase"
            :class="{ 'text-[white] bg-[#0554F2]': !$route.query.mode || $route.query.mode === 'GeneralInformation' }"
            :to="{ name: $route.name, params: { pageName: $route.params.pageName }, query: { mode: 'GeneralInformation' } }">
            Формирование стратегий
          </router-link>
          <router-link
            class="py-2 px-4 rounded-2xl text-center text-[#979DAC] font-semibold text-xl leading-5 uppercase"
            :class="{ 'text-[white] bg-[#0554F2]': $route.query.mode === 'DynamicStructure' }"
            :to="{ name: $route.name, params: { pageName: $route.params.pageName }, query: { mode: 'DynamicStructure' } }">
            ТПР
          </router-link>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <ChartsView :mode="mode" />
    </div>
  </div>
</template>



<script>
import ChartsView from '@/components/Charts/TCO/TechnicalStructureView.vue';

export default {
  name: 'TechnicalStructureView',
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