import http from '../http-common.js'

export default {
    getVolumeFulfillmentExtraction(dateStart, dateEnd, breakdownType, machineTypeIds, machineClassIds) {

        const params = {
            dateStart: dateStart,
            dateEnd: dateEnd,
        };

        const arrayMachineClassIds = []

        const arrayMachineTypeIds = []

        if (machineTypeIds) {
            params.machineTypeIds = [ 44 ];
        }

        if (machineClassIds) {
            params.machineClassIds = [arrayMachineClassIds.push(machineClassIds)];
        }

        if (breakdownType) {
            params.breakdownType = breakdownType
        } else {
            params.breakdownType = 'year'
        }

        console.log(params)

        return http.get(`/tep/fulfilmentOfCoalMiningAndStrippingVolumes/`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },

    getMonthlyParkProductivity(dateStart, dateEnd, machineTypeIds, machineClassIds) {

        const params = {
            dateStart: dateStart,
            dateEnd: dateEnd,
        };

        const arrayMachineClassIds = []

        const arrayMachineTypeIds = []

        if (machineTypeIds) {
            params.machineTypeIds = [ 44 ];
        }

        if (machineClassIds) {
            params.machineClassIds = [arrayMachineClassIds.push(machineClassIds)];
        }

        return http.get(`machineClassIds`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
}