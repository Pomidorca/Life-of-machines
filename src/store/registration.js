import { defineStore } from "pinia";
import http from '../http-common.js'
import UserDataService from "@/services/UserDataService.js";

export const useRegistrationStore = defineStore('registration-API', () => {
    const registerAdmin = (adminData) => {
        return UserDataService.postRegisterAdmin(adminData)
    }

    const getOrganizations = (organizationsList) => {
        return http.get('/administration/organizations', organizationsList)
    }

    return {
        registerAdmin,
        getOrganizations,
    }
})