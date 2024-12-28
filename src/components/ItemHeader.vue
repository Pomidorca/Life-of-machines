<template>
  <div v-for="item in $store.state.header" :key="item.id">
    <router-link @click.prevent="handleClick(item)" :to="item.route"
      class="text-nowrap link flex gap-x-2 items-center px-2 py-3 rounded-lg font-medium" :class="{ 'active': isActive(item) }">
      <img :src="isActive(item) ? item.imgActive : item.img" class="w-6 h-6"
        :class="{ 'active-img': isActive(item) }" />
      <span v-if="showMenu" class="duration-300">{{ item.title }}</span>
    </router-link>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

defineProps({
  showMenu: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['toggleMenu']);
const state = reactive({ activeItem: null });

function handleClick(item) {
  state.activeItem = item;
}

function isActive(item) {
  return state.activeItem?.id === item.id;
}
</script>

<style scoped>
.link {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-family: sans-serif;
  line-height: 20px;
  font-weight: 500;
  width: 100%;
  box-sizing: border-box;
}

.active {
  background-color: white;
  color: #0554F2;
  transition: all 0.3s ease;
}
</style>
