import http from '../http-common.js'

export default {
    getMashineClasses(filterParams) {
        return http.get(`/data/machine-classes/${filterParams}`);
    },
}