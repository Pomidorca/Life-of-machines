<script setup>
  import TheHeader from '@/components/TheHeader.vue';
  import TheFilter from '@/components/TheFilter.vue';
  import TheInfoTech from '@/components/TheInfoTech.vue';
</script>

<template>
  <div class="flex">
    <header>
      <TheHeader />
    </header>
    <div>
      <TheFilter />
    </div>
    <div class="container">
      <div class="flex flex-col gap-y-8 pt-10 px-6">
        <TheInfoTech />
        <router-view />
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>