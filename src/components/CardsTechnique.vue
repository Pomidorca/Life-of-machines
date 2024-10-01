<template>
  <div v-for="technique in techniques" :key="technique.id" @click="$emit('selectTechnique', technique)">
    <div class="flex flex-col items-center gap-y-0.5">
      <img class="w-[64px] h-[64px] bg-cover bg-center bg-no-repeat" :src="technique.image" alt="tech">
      <p class="text-[#001233] text-xs font-normal">{{technique.title}}</p>
    </div>

    <!-- <div class="park-nav" >
            <div class="park-nav-item" > 
              <div class="park-nav-item-img">
                <img :src="tech.image" alt="">
                <span>{{tech.title}}</span>
              </div>
              <div class="park-nav-item-info">
                <span>{{tech.total}}</span>
                <hr>1
                <p>{{tech.repair}}</p>
              </div>
            </div>
        </div> -->
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