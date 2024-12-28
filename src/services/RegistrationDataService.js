import http from '../http-common.js'

export default {
    // регистрация администратора
    postRegisterAdmin (adminData) {
        return http.post('/auth/registration/administration', adminData)
    },

    // получение списка доступных организаций
    getOrganizations (organizationsList) {
        return http.get('/administration/organizations', organizationsList)
    },

    // регистрация новой компании
    registerOrganization (organizationData) {
        return http.post('/administration/registration/organizations', organizationData)
    }
}