<template>
    <div class="wrapper-auth fixed left-0 top-0 w-screen h-screen overflow-hidden z-5000 bg-white/50 backdrop-blur-3xl">
        <div v-if="!pageIsLoading" class="flex overflow-y-hidden h-full">
            <div class="bg-[#0554F2] w-full lg:w-[50%] h-[100vh] pt-16 flex flex-col hidden lg:flex">
                <div class=" pt-[1rem]">
                    <div class="px-10">
                      <h1 class="text-white font-semibold"> Начните Работать <br>
                        Эффективнее И
                        Быстрее! </h1>
                      <p class="mt-5 text-[130%] text-white">
                        Зарегистрируйтесь, чтобы получить доступ к аналитике, <br> графикам и инструментам
                        мониторинга для оптимизации
                        <br> работы строительной техники.
                      </p>
                    </div>
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
            </div>
            <form class="flex flex-col justify-center items-center h-full w-full lg:w-[50%] px-5 m-auto">
              <div class="max-w-xl w-full">
                <header class="registration-form-header">
                  <h2 class="text-[#001233] font-semibold text-3xl"> Регистрация </h2>
                </header>
                <main class="flex flex-col w-full">
                  <div class="flex flex-col gap-2.5 mt-6">
                    <label class="text-lg text-[#001233] flex flex-col"> Имя
                      <input
                          class="mt-2 px-6 py-2.5 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                          type="text" placeholder="Введите своё имя..." v-model="adminData.firstName">
                    </label>
                    <label class="text-lg text-[#001233] flex flex-col"> Фамилия
                      <input
                          class="mt-2 px-6 py-2.5 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                          type="text" placeholder="Введите свою фамилию..." v-model="adminData.lastName">
                    </label>
                    <label class="text-lg text-[#001233] flex flex-col"> Отчество
                      <input
                          class="mt-2 px-6 py-2.5 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                          type="text" placeholder="Введите своё отчество.." v-model="adminData.middleName">
                    </label>
                    <label class="text-lg text-[#001233] flex flex-col">Email
                      <input
                          class="mt-2 px-6 py-2.5 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                          type="email" placeholder="example@gmail.com" v-model="adminData.email">
                    </label>
                    <label class="text-lg text-[#001233] flex flex-col"> Пароль
                      <input
                          class="mt-2 px-6 py-2.5 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                          type="password" placeholder="Введите пароль..." v-model="adminData.password">
                    </label>
                    <div class="mb-4">
                      <label class="text-lg text-[#001233] flex flex-col"> Выберите организацию
                        <select size="2" overflow="scroll"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                                        leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-base"
                                v-model="adminData.organizationId">
                          <option v-for="organization in availableOrganizations" :key="organization.id"
                                  :value="organization.id">
                            {{ organization.name }}
                          </option>
                        </select>
                      </label>
                    </div>
                  </div>
                </main>
                <footer class="flex  flex-row gap-3 items-center">
                  <button class="py-4 w-full bg-[#0554F2] text-white text-xl leading-6 font-semibold rounded-3xl p-4"
                          @click.prevent="registerAdmin"> Зарегистрироваться </button>
                </footer>
                <Transition>
                  <span v-if="emptyFields" class="text-[#960018] m-auto font-semibold"> Заполните все поля! </span>
                </Transition>
              </div>
            </form>
        </div>
        <div v-else class="flex items-center bg-[#fff] w-[100%] h-[100vh]">
            <img src="/img/registration/loading.gif" class="max-w-[3.6rem] m-auto">
        </div>
    </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue';
import RegistrationDataService from '@/services/RegistrationDataService';
import router from '@/router';

const adminData = ref({
    email: '',
    password: '',
    organizationId: 0,
    firstName: '',
    lastName: '',
    middleName: ''
})
const availableOrganizations = ref([])
const emptyFields = ref(false)
const pageIsLoading = ref(false)
const parent = ref(null);
const authImage = ref(null);
const imageClass = ref('bottom-0');

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
  window.removeEventListener('resize', adjustImagePosition);
});

const getOrganizations = () => {
    RegistrationDataService.getOrganizations()
        .then((response) => {
            availableOrganizations.value = response.data
        })
        .catch((error) => {
            console.log("Проблема с получением организаций: " + error)
        })
}

getOrganizations();

const checkAllFields = () => {
    for (let key in adminData.value) {
        const value = adminData.value[key];
        if (value === null || value === undefined || value === '' || value === 0) {
            return false;
        }
    }
    return true;
};

const registerAdmin = () => {
    if (checkAllFields()) {
        pageIsLoading.value = true
        RegistrationDataService.postRegisterAdmin(adminData.value)
            .catch((error) => {
                console.log('Ошибка: ' + error);
            })
            .finally(() => {
                setTimeout(() => {
                    router.push('/');
                    pageIsLoading.value = false
                }, 2000)
            })
    }
    else {
        emptyFields.value = true
        setTimeout(() => {
            emptyFields.value = false
        }, 2000)
    }
}

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>