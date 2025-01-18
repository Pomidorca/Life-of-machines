<template>
    <div class="wrapper-auth h-full w-full flex">
      <div class="bg-[#0554F2] w-full lg:w-[50%] h-[100vh] pt-16 flex flex-col hidden lg:flex">
        <div class="px-10">
          <h1 class=" text-white font-semibold leading-10"> Рады видеть вас! </h1>
          <p class="mt-5 text-white text-xl">{{ descriptionPage }}</p>
        </div>
        <div ref="parent" class="flex-1 relative">
          <img
              :class="imageClass"
              ref="authImage"
              class="absolute right-0"
              src="/img/Auth/auth.svg"
              alt=""
          />
        </div>
        <div class="flex flex-col justify-center items-center w-[50%]">
            <div class="flex flex-col w-full max-w-[424px]">
                <h2 class="text-[#001233] font-semibold text-4xl"> Вход </h2>
                <div class="flex flex-col gap-y-6 mt-8">
                    <!-- <div class="flex flex-col">
                        <label class="text-lg text-[#001233]">Имя</label>
                        <input
                            class="mt-2 px-6 py-4 text-xl text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                            type="text" placeholder="имя">
                    </div> -->
                    <div class="flex flex-col">
                        <label class="text-lg text-[#001233]">Email</label>
                        <input
                            class="mt-2 px-6 py-4 text-xl text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                            type="email" placeholder="Email (root@server.local)" v-model="username">
                    </div>
                    <div class="flex flex-col gap-y-6">
                        <div class="flex flex-col">
                            <label class="text-lg text-[#001233]">Введите пароль</label>
                            <input
                                class="mt-2 px-6 py-4 text-xl text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                                type="password" placeholder="Пароль" v-model="password">
                        </div>
                    </div>
                </div>
                <div class="h-5 text-center mt-2">
                    <span v-if="authStore.errorMessage" class="text-red-500">Неправильные данные</span>
                </div>
                <div class="flex flex-col items-center mt-6">
                    <button class="py-4 w-full bg-[#0554F2] text-white text-xl leading-6 font-semibold rounded-3xl"
                        @click="auth"> Авторизоваться </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import {onBeforeUnmount, onMounted, ref} from 'vue';

const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const parent = ref(null);
const authImage = ref(null);
const imageClass = ref('bottom-0');

const auth = async () => {
    try {
        await authStore.login({ username: username.value, password: password.value });
    } catch (error) {
        console.error('Ошибка авторизации:', error);
    }
}

const adjustImagePosition = () => {
  const parentHeight = parent.value.clientHeight;
  const imageHeight = authImage.value.clientHeight;

  if (imageHeight > parentHeight) {
    imageClass.value = 'top-0';
  } else {
    imageClass.value = 'bottom-0';
  }
};

onMounted(() => {
  adjustImagePosition();
  window.addEventListener('resize', adjustImagePosition);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustImagePosition); // Удаляем обработчик события
});

const descriptionPage = 'Войдите в систему и продолжайте отслеживать и контролировать работу строительной техники в режиме реального времени.'
</script>