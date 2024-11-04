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
    <div class="w-full">
      <TheInfoTech />
      <div class="flex">
        <TheFilter />
        <div class="container pl-6">
          <div class="">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>