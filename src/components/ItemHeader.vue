<template>
  <div>
    <div v-for="item in $store.state.header" :key="item.id">
      <router-link @click.prevent="handleClick(item)" :to="item.route"
        class="link flex gap-x-2 items-center px-4 py-3 w-44 rounded-lg font-medium"
        :class="{ 'active': isActive(item) }">
        <img :src="item.img" :class="{ 'router-link-active': $route.path === item.route }" />
        <span>{{ item.title }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>

import {
  reactive
} from 'vue';


const state = reactive({
  activeItem: null
});

function handleClick(item) {
  if (!state.activeItem || state.activeItem !== item) {
    state.activeItem = item;
  } else {
    state.activeItem = null;
  }
}

function isActive(item) {
  return state.activeItem && state.activeItem.id === item.id;
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
}

.active {
  background-color: white;
  border-radius: 5px;
  color: #0554f2;
  font-family: sans-serif;
  text-decoration: none;
  transition: all 0.3s ease;
}

.router-link-active img {
  fill: #007bff;
}
</style>