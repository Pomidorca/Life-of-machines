<template>
  <ul>
    <li v-for="item in menu" :key="item.id">
      <router-link @click.prevent="handleClick(item)" :to="item.route"
                   class="text-nowrap link flex gap-x-2 items-center px-2 py-3 rounded-lg font-medium">
        <img :src="item.route === route.path ? item.imgActive : item.img" class="w-6 h-6"
             :class="{ 'active-img': isActive(item) }" loading="lazy" />
        <span v-if="showMenu" class="duration-300">{{ item.title }}</span>
      </router-link>
    </li>
    <li class="indicator" :style="indicatorStyle">

    </li>
  </ul>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from 'vue';
import store from '@/store/store';
import RegistrationDataService from '@/services/RegistrationDataService';
import { useRoute } from 'vue-router';

defineProps({
  showMenu: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['toggleMenu']);
const state = reactive({ activeItem: null });
const userRoleID = ref(0);
const menu = ref([])
const route = useRoute();

function isActive(item) {

  return state.activeItem?.id === item.id;
}

const activeId = computed(() => {
  const activeItem = menu.value.find((item) => item.route === route.path);
  return activeItem ? activeItem.id : null;
});

const indicatorStyle = computed(() => {
  const index = activeId.value;
  const top = index !== -1 ? `calc(56px * ${index})` : '0';
  return {
    top: top,
  };
});


const filterMenuByUserRole = (userRoleID) => {
  menu.value = store.state.header
  if (userRoleID === 1) {
    menu.value = menu.value.filter(link => link.id !== 9)
  }
  else if (userRoleID === 2) {
    menu.value = menu.value.filter(link => link.id !== 8)
  }
  else menu.value = menu.value.filter(link => link.id !== 8 && link.id !== 9)
}

onMounted(() => {
  RegistrationDataService.getUserRole()
    .then((response) => {
      userRoleID.value = response.data.role.id
      filterMenuByUserRole(userRoleID.value)
    })
    .catch((error) => {
      console.log("Проблема с получением роли пользователя: " + error)
    })
})
</script>

