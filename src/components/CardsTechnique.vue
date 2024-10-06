<template>
  <div v-for="technique in techniques" :key="technique.id" @click="$emit('selectTechnique', technique)">
    <div class="flex items-center gap-x-3.5">
      <div class="flex flex-col items-center gap-y-0.5">
        <img class="w-[64px] h-[64px] bg-cover bg-center bg-no-repeat" :src="technique.image" alt="tech">
        <p class="text-[#001233] text-xs font-normal">{{technique.title}}</p>
      </div>
      <div class="flex flex-col gap-y-2">
        <p class="flex items-center gap-x-1 font-medium text-[#0554F2] leading-5"><img src="/img/tech/Check Circle.svg"> {{ technique.total }}</p>
        <p class="flex items-center gap-x-1 font-medium text-[#979DAC] leading-5"><img src="/img/tech/Danger Circle.svg"> {{ technique.repair }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    computed
  } from "vue";
  import {
    useStore
  } from "vuex";

  export default {
    setup() {
      const store = useStore();
      const techniques = computed(() => store.state.techniques);

      return {
        techniques,
      };
    },
  };
</script>