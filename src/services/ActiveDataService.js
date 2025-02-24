import http from '../http-common.js'

export default {
    getActiveStructure(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds) {

        const params = {
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

        return http.get(`/actives/charts/structure`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    getAverageAge(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds) {

        const params = {
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

        return http.get(`/actives/charts/average-age`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    getWorkDistribution(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds) {

        const params = {
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

        return http.get(`/actives/charts/work-distribution`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    getCountAndAverageAge(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds) {

        const params = {
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

        return http.get(`/actives/charts/count-and-average-age`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
}