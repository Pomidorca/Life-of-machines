<template>
  <div class="flex gap-y-2 min-h-[100%] h-screen bg-[#0554F2]">
    <div class="flex flex-col mx-auto text-center px-8 py-10 justify-between">
      <div>
        <div class="flex justify-between px-4">
          <h1 class="text-2xl font-medium leading-5 text-white">СППР</h1>
          <button><img src="/img/header/burger.svg" alt="burger"></button>
        </div>
        <div class="mt-8">
          <ItemHeader />
        </div>
      </div>
      <div>
        <button @click="authStore.logout()"
          class="px-4 flex gap-x-2 items-center font-medium text-xl text-[#FFFFFF]"><img src="/img/Auth/Exit.svg"
            alt="">Выход</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import ItemHeader from './ItemHeader.vue';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();
</script>