import http from '../http-common.js'

export default {
    postLogin(body) {
        return http.post('/auth/login', body);
    }
}