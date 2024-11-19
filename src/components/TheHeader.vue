<template>
  <div class="flex gap-y-2 min-h-[100%] h-screen bg-[#0554F2]">
    <div class="flex flex-col mx-auto text-center px-8 py-10">
      <div class="flex justify-between px-4">
        <h1 class="text-2xl font-medium leading-5 text-white">СППР</h1>
        <button><img src="/img/header/burger.svg" alt="burger"></button>
      </div>
      <div class="mt-8">
        <ItemHeader />
      </div>
    </div>
  </div>
</template>

<script setup>
import ItemHeader from './ItemHeader.vue';
</script>