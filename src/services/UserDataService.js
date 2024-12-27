import http from '../http-common.js'

export default {
    postLogin(body) {
        return http.post('/auth/login', body);
    },

    // регистрация администратора
    postRegisterAdmin(adminData) {
        return http.post('/auth/registration/administration', adminData)
    }
}