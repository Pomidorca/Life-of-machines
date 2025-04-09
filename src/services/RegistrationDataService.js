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
    },

    // регистрация пользователя администратором
    registerUser (userData) {
        return http.post('/administration/registration/users', userData)
    },

    // получение ролей: пользователь и оператор
    getRoles (roles) {
        return http.get('/administration/roles', roles)
    },

    // получение всех ролей
    getUserRole (userRole) {
        return http.get('/administration/users', userRole)
    }
    
}