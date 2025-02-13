<template>
        <div class="wrapper-sidebar flex flex-col" :class="{ 'show-menu': !showMenu }">

          <div class="sidebar-header mb-5 flex items-center" :class="showMenu ? 'justify-between' : 'justify-center'">
            <h1 class="sidebar-header-logo" v-if="showMenu"> СППР </h1>
            <div class="sidebar-header-toggle cursor-pointer" :class="showMenu ? 'me-5' : ' mb-3'" @click="toggleMenu">
              <span class="sidebar-header-toggle-line line-top"></span>
              <span class="sidebar-header-toggle-line line-middle"></span>
              <span class="sidebar-header-toggle-line line-bottom"></span>
            </div>
          </div>
          <div class="sidebar-body flex-1 mt-2">
            <ItemHeader :showMenu="showMenu" @toggleMenu="toggleMenu" />
          </div>
          <div class="sidebar-footer flex justify-center" :class="showMenu ? 'justify-between' : 'justify-center'">
            <button @click="authStore.logout()"
              class="px-2 flex gap-x-2 items-center font-medium text-xl text-[#FFFFFF]"><img src="/img/Auth/Exit.svg"
              alt=""><span v-if="showMenu">Выход</span></button>
          </div>
        </div>
<!--  <div class="flex gap-y-2 min-h-[100%] h-screen bg-[#0554F2] duration-300">-->
<!--    <div class="flex flex-col mx-auto text-center px-8 py-10 justify-between" :class="{ 'px-2': !showMenu }">-->
<!--      <div>-->
<!--        <div class="flex justify-between px-2">-->
<!--          <h1 class="text-2xl font-medium leading-5 text-white" v-if="showMenu"> СППР </h1>-->
<!--          <button @click="toggleMenu"><img class="w-6 h-6" src="/img/header/burger.svg" alt="burger"></button>-->
<!--        </div>-->
<!--        <div class="menu-container transition-width duration-300 ease-in-out mt-8"-->
<!--          :class="[showMenu ? 'w-[200px]' : 'w-[40px]', !isSlowDevice ? 'animate' : '']">-->
<!--          <ItemHeader :showMenu="showMenu" @toggleMenu="toggleMenu" />-->
<!--        </div>-->
<!--      </div>-->
<!--      <div>-->
<!--        <button @click="authStore.logout()"-->
<!--          class="px-2 flex gap-x-2 items-center font-medium text-xl text-[#FFFFFF]"><img src="/img/Auth/Exit.svg"-->
<!--            alt=""><span v-if="showMenu">Выход</span></button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ItemHeader from './ItemHeader.vue';
import { useAuthStore } from '@/store/auth';

const showMenu = ref(true);
const authStore = useAuthStore();

const loadShowMEnuFromStorage = () => {
  const storedShowMenu = localStorage.getItem('showMenu');
  if (storedShowMenu !== null) {
    showMenu.value = JSON.parse(storedShowMenu);
  }
}

const saveShowMenuToStorage = () => {
  localStorage.setItem('showMenu', JSON.stringify(showMenu.value));
}
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
  saveShowMenuToStorage();
};

onMounted(() => {
  loadShowMEnuFromStorage();
});
</script>