<template>
  <adaptiveModal class="adaptive-modal">
    <template v-slot:header>
      <h2> Мобильное приложение недоступно. <br> Пожалуйста, войдите через компьютер. </h2>
    </template>
    <template v-slot:main>
      <img class="adaptive-img" src="/img/Auth/adaptive.png">
    </template>
  </adaptiveModal>
  <div class="main-wrapper h-full w-full ">
    <main v-if="isAuth">
      <div class="flex">
        <div class="header">
          <TheHeader />
        </div>
        <div class="content-wrapper w-full flex flex-col">
          <TheInfoTech/>
          <div class="flex flex-1">
            <div class="mt-6 w-full">
              <div class="h-full">
                <router-view />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <main v-else>
      <component :is="checkAdmin()" />
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
import { useRoute, useRouter } from 'vue-router';
import AdminRegistration from './views/registration/AdminRegistration.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const registrationRules = computed(() => route.query.req);

onMounted(() => {
  checkAdmin();
  authStore.loadTokensFromSessionStorage();
})

const isAuth = computed(() => {
  return authStore.accessToken !== null;
})

const checkAdmin = () => {
  if (registrationRules.value) {
    const newReq = registrationRules.value !== 'admin' ? 'user' : 'admin';
    router.push({ query: { ...route.query, req: newReq } });
  }

  return registrationRules.value === 'admin' ? AdminRegistration : TheAuth
}
</script>