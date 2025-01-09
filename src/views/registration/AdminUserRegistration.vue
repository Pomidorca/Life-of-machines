<template>
    <newUser class="admin-add-new-modal">
        <template #header>
            <h2 class="modal-registration-form-title"> Регистрация нового пользователя </h2>
        </template>
        <template #main>
            <div class="modal-registration-form">
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
        </template>
        <template #footer>
            <div class="buttons-container">
                <Transition>
                    <span v-if="emptyFields" class="text-[#960018] m-auto font-semibold"> Заполните все поля! </span>
                </Transition>
                <button class="py-4 w-full bg-[#0554F2] text-white text-xl leading-6 font-semibold rounded-3xl p-4 
                    organization-registration-form-button"
                    @click.prevent="registerUser"> Зарегистрировать </button>
                <button class="py-4 w-full bg-[#0554F2] text-white text-xl leading-6 font-semibold rounded-3xl p-4
                    organization-registration-form-button"
                    @click.prevent="router.go(-1)"> Закрыть </button>
            </div>
        </template>
    </newUser>
</template>

<script setup>
import { ref } from 'vue';
import newUser from '@/components/ModalTemplate.vue'
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
        setTimeout(() => {
            router.go(-1);
        }, 200)
        return RegistrationDataService.registerUser(userData.value);
    }
    else {
        emptyFields.value = true
        setTimeout(() => {
            emptyFields.value = false
        }, 2000)
    }
}
</script>

<style></style>