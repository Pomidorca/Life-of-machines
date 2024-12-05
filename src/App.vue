<script setup>
import TheHeader from '@/components/TheHeader.vue';
import TheFilter from '@/components/TheFilter.vue';
import TheInfoTech from '@/components/TheInfoTech.vue';
import TheAuth from '@/views/Auth.vue';
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

<template>
  <main v-if="isAuth">
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
  </main>
  <main v-else>
    <TheAuth />
  </main>
</template>


<style scoped></style>