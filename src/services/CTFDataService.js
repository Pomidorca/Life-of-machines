import http from '../http-common.js'
export default {
    getWorkTimeByServiceLife(dateStart, dateEnd, machineClassIds, machineTypeIds) {

        const params = {
            dateStart: dateStart,
            dateEnd: dateEnd,
        };

        if (machineClassIds) {
            params.machineClassIds = machineClassIds;
        }

        if (machineTypeIds) {
            params.machineTypeIds = machineTypeIds;
        }

        return http.get(`/ctf/charts/worktimeByServiceLife`, {
            params
        });
    },
}