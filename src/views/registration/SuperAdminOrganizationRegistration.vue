<template>
    <div class="fixed left-0 top-0 w-screen h-screen overflow-hidden z-5000 bg-white backdrop-blur-3xl">
        <div class="flex overflow-y-hidden">
            <div v-if="!pageIsLoading" class="flex items-center bg-[#fff] w-[100%] h-[100vh]">
                <img src="/img/registration/organization.png" class="w-[40vw] h-auto m-auto pointer-events-none">
                <form class="w-[50vw] m-auto flex flex-col justify-center">
                    <header class="registration-form-header m-auto">
                        <h2 class="text-[#001233] font-semibold text-3xl text-nowrap"> Регистрация новой организации </h2>
                    </header>
                    <main class="flex flex-col m-auto w-[70%] gap-6">
                        <div class="flex flex-col gap-2.5 mt-6">
                            <label class="text-lg text-[#001233] flex flex-col text-[color: white]"> Наименование организации
                                <input class="mt-2 px-6 py-2.5 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                                    type="text" placeholder="Введите наименование организации..." v-model="organizationData.name">
                            </label>
                            <label class="text-lg text-[#001233] flex flex-col"> Отдел организации
                                <input class="mt-2 px-6 py-4 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                                    type="text" placeholder="Введите отдел организации..." v-model="organizationData.department">
                            </label>
                            <label class="text-lg text-[#001233] flex flex-col"> Описание организации
                                <input class="mt-2 px-6 py-4 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
                                    type="text" placeholder="Введите описание организации..." v-model="organizationData.notes">
                            </label>
                        </div>
                        <div class="buttons-container flex flex-col gap-3 items-center">
                            <Transition>
                                <span v-if="emptyFields" class="text-[#960018] m-auto font-semibold"> Заполните все поля! </span>
                            </Transition>
                            <button class="py-4 w-full bg-[#0554F2] text-white text-xl leading-6 font-semibold rounded-3xl p-4 
                                modal-registration-form-button"
                                @click.prevent="registerOrganization"> 
                                {{ isLoading ? 'Регистрируем...' : 'Зарегистрировать' }}
                            </button>
                            <button class="py-4 w-full bg-[#0554F2] text-white text-xl leading-6 font-semibold rounded-3xl p-4
                                modal-registration-form-button"
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
import { onMounted, ref } from 'vue';
import RegistrationDataService from '@/services/RegistrationDataService';
import router from '@/router';

const organizationData = ref({
    name: '',
    department: '',
    notes: ''
})
const emptyFields = ref(false)
const isLoading = ref(false)
const pageIsLoading = ref(false)

onMounted (() => {
    pageIsLoading.value = true;
    setTimeout(() => {
        pageIsLoading.value = false;
    }, 2000)
})

const checkAllFields = () => {
    for (let key in organizationData.value) {
        const value = organizationData.value[key];
        if (value === null || value === undefined || value === '' || value === 0) {
            return false;
        }
    }
    return true;
};

const registerOrganization = () => {
    if (checkAllFields()) {
        isLoading.value = true;
        RegistrationDataService.registerOrganization(organizationData.value)
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