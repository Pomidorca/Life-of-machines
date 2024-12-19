<template>
  <adaptiveModal class="adaptive-modal">
    <template v-slot:header>
      <h2> Мобильное приложение недоступно. <br> Пожалуйста, войдите через компьютер. </h2>
    </template>
    <template v-slot:main>
      <img class="adaptive-img" src="/img/Auth/adaptive.png">
    </template>
  </adaptiveModal>
  <div class="main-wrapper">
    <main v-if="isAuth">
      <div class="flex">
        <header>
          <TheHeader />
        </header>
        <div class="w-full">
          <TheInfoTech />
          <div class="flex">
            <TheFilter />
            <div class="pl-6 container">
              <div>
                <router-view />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <main v-else>
      <TheAuth />
    </main>
  </div>
</template>

<script setup>
import TheHeader from '@/components/TheHeader.vue';
import TheFilter from '@/components/TheFilter.vue';
import TheInfoTech from '@/components/TheInfoTech.vue';
import TheAuth from '@/views/Auth.vue';
import adaptiveModal from '@/components/ModalTemplate.vue';
import { useAuthStore } from '@/store/auth';
import { computed, onMounted } from 'vue';

const authStore = useAuthStore();
onMounted(() => {
  authStore.loadTokensFromSessionStorage();
})

const isAuth = computed(() => {
  return authStore.accessToken !== null;
})
</script>