import http from '../http-common.js'

export default {
    postLogin(body) {
        return http.post('/auth/login', body);
    },

    /**
     * function for getting earliest Date by parameters
     * @param {Array} machineClassIds all selected classes
     * @param {Array} machineMarkIds all selected marks
     * @param {Array} machineModelIds all selected models
     * @param {Array} machineIds all selected machines
     */
    getEarliestEntryDate( machineClassIds, machineMarkIds, machineModelIds, machineIds) {

        const params = {
            ...(machineClassIds ? {
                machineClassIds: machineClassIds
            } : {}),
            ...(machineMarkIds ? {
                machineMarkIds: machineMarkIds
            } : {}),
            ...(machineModelIds ? {
                machineModelIds: machineModelIds
            } : {}),
            ...(machineIds ? {
                machineIds: machineIds
            } : {})
        };
        

        return http.get(`/machines/earliest-entry-date`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    }
}