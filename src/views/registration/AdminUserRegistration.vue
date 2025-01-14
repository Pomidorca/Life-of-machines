<template>
    <div class="fixed left-0 top-0 w-screen h-screen overflow-hidden z-5000 bg-white/50 backdrop-blur-3xl">
        <div class="flex overflow-y-hidden">
            <div v-if="!pageIsLoading" class="onMobile flex items-center bg-[#fff] w-[100%] h-[100vh]">
                <img src="/img/registration/user.png" class="w-[40vw] h-auto m-auto pointer-events-none">
                <form class="w-[50vw] m-auto flex flex-col justify-center">
                    <header class="registration-form-header m-auto">
                        <h2 class="text-[#001233] font-semibold text-2xl leading-[3.5rem]"> Регистрация нового пользователя </h2>
                    </header>
                    <main class="flex flex-col m-auto w-[70%] gap-6">
                        <div class="grid grid-cols-2 mt-6 gap-6">
                            <label class="text-lg text-[#001233] flex flex-col text-[color: white]"> Имя
                                <input class="mt-2 px-6 py-4 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                                    type="text" placeholder="Введите его имя..." v-model="userData.firstName">
                            </label>
                            <label class="text-lg text-[#001233] flex flex-col text-[color: white]"> Фамилия 
                                <input class="mt-2 px-6 py-4 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                                    type="text" placeholder="Введите его фамилию..." v-model="userData.lastName">
                            </label>
                            <label class="text-lg text-[#001233] flex flex-col text-[color: white]"> Отчество
                                <input class="mt-2 px-6 py-4 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                                    type="text" placeholder="Введите его отчество.." v-model="userData.middleName">
                            </label>
                            <label class="text-lg text-[#001233] flex flex-col text-[color: white]">Email 
                                <input class="mt-2 px-6 py-4 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                                    type="email" placeholder="example@gmail.com" v-model="userData.email">
                            </label>
                            <label class="text-lg text-[#001233] flex flex-col text-[color: white]"> Пароль 
                                <input class="mt-2 px-6 py-4 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                                    type="password" placeholder="Введите пароль..." v-model="userData.password">
                            </label>
                            <label class="text-lg text-[#001233] flex flex-col"> Выберите роль
                                <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                                        leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-base"
                                        v-model="userData.roleId">
                                    <option v-for="role in availableRoles" :key="role.id" :value="role.id">
                                        {{ role.name }}
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div class="buttons-container flex flex-col gap-3 items-center">
                            <Transition>
                                <span v-if="emptyFields" class="text-[#960018] m-auto font-semibold"> Заполните все поля! </span>
                            </Transition>
                            <button class="py-4 w-full bg-[#0554F2] text-white text-xl leading-6 font-semibold rounded-3xl p-4 
                                organization-registration-form-button"
                                @click.prevent="registerUser">
                                {{ isLoading ? 'Регистрируем...' : 'Зарегистрировать' }}
                            </button>
                            <button class="py-4 w-full bg-[#0554F2] text-white text-xl leading-6 font-semibold rounded-3xl p-4
                                organization-registration-form-button"
                                @click.prevent="router.go(-1)"> Закрыть </button>
                        </div>
                    </main>
                </form>
            </div>
            <div v-else class="flex items-center bg-[#fff] w-[100%] h-[100vh]">
                <img src="/img/registration/loading.gif" class="max-w-[3.6rem] m-auto">
            </div>  
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import RegistrationDataService from '@/services/RegistrationDataService';
import router from '@/router';

const userData = ref({
    email: '',
    password: '',
    roleId: 0,
    firstName: '',
    lastName: '',
    middleName: ''
})

const availableRoles = ref([])
const emptyFields = ref(false)
const isLoading = ref(false)
const pageIsLoading = ref(false)

onMounted (() => {
    pageIsLoading.value = true;
    setTimeout(() => {
        pageIsLoading.value = false;
    }, 2000)
})

const getRoles = () => {
    RegistrationDataService.getRoles()
    .then((response) => {
        availableRoles.value = response.data
    })
    .catch((error) => {
        console.log("Проблема с получением ролей: " + error)
    })
}

getRoles();

const checkAllFields = () => {
    for (let key in userData.value) {
        const value = userData.value[key];
        if (value === null || value === undefined || value === '' || value === 0) {
            return false;
        }
    }
    return true;
};

const registerUser = () => {
    if (checkAllFields()) {
        isLoading.value = true;
        RegistrationDataService.registerUser(userData.value)
            .catch ((error) => {
                console.log('Ошибка: ' + error);
            })
            .finally (() => {
                router.go(-1);
                isLoading.value = false;
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