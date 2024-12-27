<template>
    <div class="flex">
        <div class="bg-[#0554F2] w-[50%] h-[100vh] pt-16"
            style="background-image: url(/img/Auth/1.png); background-position: right bottom; background-size: auto; background-repeat: no-repeat;">
            <div class="px-10">
                <h1 class="text-[40px] text-white font-semibold leading-10"> </h1>
                <p class="mt-5 text-white text-xl">  </p>
            </div>
        </div>
        <form class="flex flex-col justify-center items-center w-[50%]">
            <header class="registration-form-header">
                <h2 class="text-[#001233] font-semibold text-2xl"> Регистрация администратора </h2>
            </header>
            <main class="flex flex-col w-full max-w-[424px]">
                <div class="flex flex-col gap-2 mt-8">
                    <label class="text-lg text-[#001233] flex flex-col"> Имя
                        <input
                            class="mt-2 px-6 py-4 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                            type="text" placeholder="Введите своё имя..." v-model="adminData.firstName">
                    </label>
                    <label class="text-lg text-[#001233] flex flex-col"> Фамилия 
                        <input
                            class="mt-2 px-6 py-4 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                            type="text" placeholder="Введите свою фамилию..." v-model="adminData.lastName">
                    </label>
                    <label class="text-lg text-[#001233] flex flex-col"> Отчество
                        <input
                            class="mt-2 px-6 py-4 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                            type="text" placeholder="Введите своё отчество.." v-model="adminData.middleName">
                    </label>
                    <label class="text-lg text-[#001233] flex flex-col">Email 
                        <input
                            class="mt-2 px-6 py-4 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                            type="email" placeholder="root@server.local" v-model="adminData.email">
                    </label>
                    <label class="text-lg text-[#001233] flex flex-col"> Пароль 
                        <input
                            class="mt-2 px-6 py-4 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                            type="password" placeholder="Введите пароль..." v-model="adminData.password">
                    </label>
                    <div class="mb-4">
                        <label class="text-lg text-[#001233] flex flex-col"> Выберите организацию 
                            <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                                    leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 text-base"
                                    v-model="adminData.organizationId">
                                <option v-for="organization in availableOrganizations" :key="organization.id" :value="organization.id">
                                    {{ organization.name }}
                                </option>
                            </select>
                        </label>
                    </div>
                </div>
            </main>
            <footer class="flex flex-col items-center mt-6">
                <button class="py-4 w-full bg-[#0554F2] text-white text-xl leading-6 font-semibold rounded-3xl p-4"
                    @click.prevent="registerAdmin"> Зарегистрироваться </button>
            </footer>
        </form>
    </div>
</template>

<script setup>
import { useRegistrationStore } from '@/store/registration';
import { ref } from 'vue';

const registrationStore = useRegistrationStore();
const availableOrganizations = ref([])

const adminData = ref({
    email: '',
    password: '',
    organizationId: 0,
    firstName: '',
    lastName: '',
    middleName: ''
})

const getOrganizations = () => {
    registrationStore.getOrganizations()
    .then((response) => {
        availableOrganizations.value = response.data
    })
    .catch((error) => {
        console.log("Проблема с получением организаций: " + error)
    })
}

getOrganizations();

const registerAdmin = () => {
    console.log(adminData.value)
    return registrationStore.registerAdmin(adminData.value)
}
</script>

<style></style>