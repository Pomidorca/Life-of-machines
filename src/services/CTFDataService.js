import http from '../http-common.js'
export default {
    getWorkTimeByServiceLife(dateStart, dateEnd, machineClassIds, machineTypeIds) {
        return http.get(`/ctf/charts/worktimeByServiceLife`, {
            params: {
                dateStart: '2000-01-01',
                dateEnd: '2025-01-01',
            }
        });
    },
}