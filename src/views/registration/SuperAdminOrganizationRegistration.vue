<template>
    <newOrganization class="admin-add-new-modal">
        <template #header>
            <h2 class="modal-registration-form-title"> Регистрация новой организации </h2>
        </template>
        <template #main>
            <section class="modal-registration-form">
                <label class="text-lg text-[#001233] flex flex-col text-[color: white]"> Наименование организации
                    <input class="mt-2 px-6 py-4 text-base text-[#979DAC] rounded-[32px] border-[#979DAC] border leading-6"
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
            </section>
        </template>
        <template #footer>
            <div class="buttons-container">
                <Transition>
                    <span v-if="emptyFields" class="text-[#960018] m-auto font-semibold"> Заполните все поля! </span>
                </Transition>
                <button class="py-4 w-full bg-[#0554F2] text-white text-xl leading-6 font-semibold rounded-3xl p-4 
                    modal-registration-form-button"
                    @click.prevent="registerOrganization"> Зарегистрировать </button>
                <button class="py-4 w-full bg-[#0554F2] text-white text-xl leading-6 font-semibold rounded-3xl p-4
                    modal-registration-form-button"
                    @click.prevent="router.go(-1)"> Закрыть </button>
            </div>
        </template>
    </newOrganization>
</template>

<script setup>
import { ref } from 'vue';
import newOrganization from '@/components/ModalTemplate.vue';
import RegistrationDataService from '@/services/RegistrationDataService';
import router from '@/router';

const organizationData = ref({
    name: '',
    department: '',
    notes: ''
})
const emptyFields = ref(false)

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
        setTimeout(() => {
            router.go(-1);
        }, 200)
        return RegistrationDataService.registerOrganization(organizationData.value)
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