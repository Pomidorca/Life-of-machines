import http from '../http-common.js'
export default {
    getWorkTimeByServiceLife(dateStart, dateEnd) {
        
        return http.get(`/ctf/charts/worktimeByServiceLife`, {
            params: {
                dateStart: dateStart,
                dateEnd: dateEnd,
            }
        });
    },
}