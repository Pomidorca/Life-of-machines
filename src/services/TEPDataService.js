import http from '../http-common.js'

export default {
    getVolumeFulfillmentExtraction(dateStart, dateEnd, breakdownType, machineTypeIds, machineClassIds) {

        const params = {
            dateStart: dateStart,
            dateEnd: dateEnd,
            // dateStart: '2010-01-01',
            // dateEnd: '2024-12-01'
        };

        const arrayMachineClassIds = []

        if (machineTypeIds) {
            params.machineTypeIds = machineTypeIds;
            // params.machineTypeIds = [ 26 ];
        }

        if (machineClassIds) {
            params.machineClassIds = [arrayMachineClassIds.push(machineClassIds)];
        }

        if (breakdownType) {
            params.breakdownType = breakdownType
        } else {
            params.breakdownType = 'year'
        }

        return http.get(`/tep/fulfilmentOfCoalMiningAndStrippingVolumes/`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },

    getMonthlyParkProductivity(dateStart, dateEnd, machineTypeIds, machineClassIds) {

        const params = {
            dateStart: "2020-01-01",
            dateEnd: "2024-01-01",
        };

        const arrayMachineClassIds = []

        const arrayMachineTypeIds = []

        if (machineTypeIds) {
            params.machineTypeIds = machineTypeIds;
            // params.machineTypeIds = [ 237 ];
        }

        if (machineClassIds) {
            params.machineClassIds = [arrayMachineClassIds.push(machineClassIds)];
        }

        return http.get(`/tep/monthlyParkProductivity`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },

    getDinamicsUnitCosts(dateStart, dateEnd, breakdownType, machineTypeIds, machineClassIds) {

        const params = {
            dateStart: dateStart,
            dateEnd: dateEnd,
        };

        const arrayMachineClassIds = []

        const arrayMachineTypeIds = []

        if (machineTypeIds) {

            params.machineTypeIds = machineTypeIds;
            // params.machineTypeIds = [ 237 ]
        }

        if (breakdownType) {
            params.breakdownType = breakdownType
        } else {
            params.breakdownType = 'year'
        }

        if (machineClassIds) {
            params.machineClassIds = [arrayMachineClassIds.push(machineClassIds)];
        }

        return http.get(`/tep/dynamicsOfUnitCosts`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    getComparisonOfTargetAndActualUnitCosts(dateStart, dateEnd, machineTypeIds, machineClassIds) {

        const params = {
            dateStart: dateStart,
            dateEnd: dateEnd,
        };

        const arrayMachineClassIds = []

        const arrayMachineTypeIds = []

        if (machineTypeIds) {

            params.machineTypeIds = machineTypeIds;
            // params.machineTypeIds = [ 237 ]
        }

        if (machineClassIds) {
            params.machineClassIds = [arrayMachineClassIds.push(machineClassIds)];
        }

        return http.get(`/tep/comparisonOfTargetAndActualUnitCosts`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
}