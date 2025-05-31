import http from '../http-common.js'

export default {
    /**
     * function for receiving repair data
     * @param {Date} dateStart
     * @param {Date} dateEnd
     * @param {Array} machineClassIds
     * @param {Array} machineMarkIds
     * @param {Array} machineModelIds
     * @param {Array} machineIds
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getIndicatorOfOrganizationOfRepairs( dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds ) {

        const params = {
            ...(machineClassIds ? {
                machineClassIds: machineClassIds
            } : {}),
            ...(
                machineClassIds ? {
                    machineClassIds: machineClassIds
                } : {}
            ),
            ...(
                machineMarkIds ? {
                    machineMarkIds: machineMarkIds
                } : {}
            ),
            ...(
                machineModelIds ? {
                    machineModelIds: machineModelIds
                } : {}
            ),
            ...(
                machineIds ? {
                    machineIds: machineIds
                } : {}
            )
        }
        return http.post('/toir/indicatorOfOrganizationOfRepairs', {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    }
}