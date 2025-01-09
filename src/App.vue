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
      <!-- <TheAuth /> -->
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
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AdminRegistration from './views/registration/AdminRegistration.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

onMounted(() => {
  authStore.loadTokensFromSessionStorage();
})

const isAuth = computed(() => {
  return authStore.accessToken !== null;
})

const checkAdmin = () => {
  const registrationRules = ref(route.query.req);
  router.push({ query: { ...route.query, req: registrationRules.value } });
  
  console.log(registrationRules)
  const newReq = registrationRules !== 'admin' ? 'user' : 'admin';
  router.push({ query: { ...route.query, req: newReq } });
  // console.log(registrationRules)

  return (registrationRules === 'admin') ? AdminRegistration : TheAuth
}

watch(() => route.query.req, (newQuery) => {
    // console.log(newQuery)
    checkAdmin(); // Вызываем функцию проверки
});
</script>