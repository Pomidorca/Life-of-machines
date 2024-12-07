<template>
  <div>
    <div v-for="item in $store.state.header" :key="item.id">
      <div v-if="showMenu">
        <router-link @click.prevent="handleClick(item)" :to="item.route"
          class="link flex gap-x-2 items-center px-4 py-3 w-44 rounded-lg font-medium"
          :class="{ 'active': isActive(item) }">
          <img :src="item.img" :class="{ 'router-link-active': $route.path === item.route }" />
          <span class="duration-300">{{ item.title }}</span>
        </router-link>
      </div>


      <div v-if="!showMenu">
        <router-link @click.prevent="handleClick(item)" :to="item.route"
          class="link flex gap-x-2 items-center w-10 px-2 py-3 rounded-lg font-medium"
          :class="{ 'active': isActive(item) }">
          <img class="w-6 h-6" :src="item.img" :class="{ 'router-link-active': $route.path === item.route }" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  reactive
} from 'vue';


defineProps({
  showMenu: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['toggleMenu']);
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