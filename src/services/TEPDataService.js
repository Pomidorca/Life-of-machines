import http from '../http-common.js'

export default {
    getVolumeFulfillmentExtraction(dateStart, dateEnd, breakdownType, machineTypeIds) {

        const params = {
            dateStart: dateStart,
            dateEnd: dateEnd,
        };

        const array = [194, 195]

        if (machineTypeIds) {
            params.machineIds = array;
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
}