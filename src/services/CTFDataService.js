import http from '../http-common.js'
export default {
    getWorkTimeByServiceLife(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds) {

        const params= {
            dateStart: dateStart,
            dateEnd: dateEnd,
        };

        if (machineClassIds) {
            params.machineClassIds = machineClassIds;
        }

        if (machineMarkIds) {
            params.machineMarkIds = machineMarkIds
        }

        if (machineModelIds) {
            params.machineTypeIds = machineModelIds
        }

        if (machineIds) {
            params.machineIds = machineIds
        }

        return http.get(`/ctf/charts/worktimeByServiceLife`, {
            params
        });
    },

    getYearly(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds) {

        const params= {
            dateStart: dateStart,
            dateEnd: dateEnd,
        };

        if (machineClassIds) {
            params.machineClassIds = machineClassIds;
        }

        if (machineMarkIds) {
            params.machineMarkIds = machineMarkIds
        }

        if (machineModelIds) {
            params.machineTypeIds = machineModelIds
        }

        if (machineIds) {
            params.machineIds = machineIds
        }

        return http.get(`/ctf/charts/yearly`, {
            params
        });
    },

    getStructure(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds) {

        const params= {
            dateStart: dateStart,
            dateEnd: dateEnd,
        };

        if (machineClassIds) {
            params.machineClassIds = machineClassIds;
        }

        if (machineMarkIds) {
            params.machineMarkIds = machineMarkIds
        }

        if (machineModelIds) {
            params.machineTypeIds = machineModelIds
        }

        if (machineIds) {
            params.machineIds = machineIds
        }

        return http.get(`/ctf/charts/structure`, {
            params
        });
    }
}