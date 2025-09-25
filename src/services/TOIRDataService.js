import http from '../http-common.js'

export default {
    /**
     * function for receiving repair data
     * @param dateStart
     * @param dateEnd
     * @param breakdownType
     * @param machineClassIds
     * @param machineMarkIds
     * @param machineModelIds
     * @param machineIds
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getIndicatorOfOrganizationOfRepairs( dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds ) {

        const params = {
            ...(dateStart ? {
                dateStart: dateStart
            } : {}),
            ...(dateEnd ? {
                dateEnd: dateEnd
            } : {}),
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
            ),
            ...(
                breakdownType ? {
                    breakdownType: breakdownType
                } : {
                    breakdownType: 'year'
                }
            )
        }

        return http.get('/toir/indicatorOfOrganizationOfRepairs', {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    getTheWorkPlanningIndicator( dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds ) {

        const params = {
            ...(
                dateStart ? {
                dateStart: dateStart
            } : {}
            ),
            ...(
                dateEnd ? {
                dateEnd: dateEnd
            } : {}
            ),
            ...(
                machineClassIds ? {
                machineClassIds: machineClassIds
            } : {}
            ),
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
            ),
            ...(
                breakdownType ? {
                    breakdownType: breakdownType
                } : {
                    breakdownType: 'year'
                }
            )
        }

        return http.get('/toir/theWorkPlanningIndicator', {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    /**
     * function for get total emergency downtime
     * @param dateStart
     * @param dateEnd
     * @param breakdownType
     * @param machineClassIds
     * @param machineMarkIds
     * @param machineModelIds
     * @param machineIds
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getTotalEmergencyDowntime( dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds ) {

        const params = {
            ...(
                dateStart ? {
                dateStart: dateStart
            } : {}
            ),
            ...(
                dateEnd ? {
                dateEnd: dateEnd
            } : {}
            ),
            ...(
                machineClassIds ? {
                machineClassIds: machineClassIds
            } : {}
            ),
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
            ),
            ...(
                breakdownType ? {
                    breakdownType: breakdownType
                } : {
                    breakdownType: 'year'
                }
            )
        }

        return http.get('/toir/totalEmergencyDowntime', {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    /**
     * function for get emergency downtime
     * @param dateStart
     * @param dateEnd
     * @param breakdownType
     * @param machineClassIds
     * @param machineMarkIds
     * @param machineModelIds
     * @param machineIds
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getEmergencyDowntime( dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds ) {

        const params = {
            ...(
                dateStart ? {
                    dateStart: dateStart
                } : {}
            ),
            ...(
                dateEnd ? {
                    dateEnd: dateEnd
                } : {}
            ),
            ...(
                machineClassIds ? {
                    machineClassIds: machineClassIds
                } : {}
            ),
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
            ),
            ...(
                breakdownType ? {
                    breakdownType: breakdownType
                } : {
                    breakdownType: 'year'
                }
            )
        }

        return http.get('/toir/totalEmergencyDowntime', {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    /**
     * function for get total average repair time
     * @param dateStart
     * @param dateEnd
     * @param breakdownType
     * @param machineClassIds
     * @param machineMarkIds
     * @param machineModelIds
     * @param machineIds
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getTotalAverageRepairTime( dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds ) {

        const params = {
            ...(
                dateStart ? {
                    dateStart: dateStart
                } : {}
            ),
            ...(
                dateEnd ? {
                    dateEnd: dateEnd
                } : {}
            ),
            ...(
                machineClassIds ? {
                    machineClassIds: machineClassIds
                } : {}
            ),
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
            ),
            ...(
                breakdownType ? {
                    breakdownType: breakdownType
                } : {
                    breakdownType: 'year'
                }
            )
        }

        return http.get('/toir/totalAverageRepairTime', {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    /**
     * function for get the number of subsystem failures
     * @param dateStart
     * @param dateEnd
     * @param machineClassIds
     * @param machineMarkIds
     * @param machineModelIds
     * @param machineIds
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getTheNumberOfSubsystemFailures( dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds ) {

        const params = {
            ...(
                dateStart ? {
                    dateStart: dateStart
                } : {}
            ),
            ...(
                dateEnd ? {
                    dateEnd: dateEnd
                } : {}
            ),
            ...(
                machineClassIds ? {
                    machineClassIds: machineClassIds
                } : {}
            ),
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

        return http.get('/toir/theNumberOfSubsystemFailures', {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    getBreakdownCountsByFaultName( dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds ) {

        const params = {
            ...(
                dateStart ? {
                    dateStart: dateStart
                } : {}
            ),
            ...(
                dateEnd ? {
                    dateEnd: dateEnd
                } : {}
            ),
            ...(
                machineClassIds ? {
                    machineClassIds: machineClassIds
                } : {}
            ),
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

        return http.get('/toir/breakdownCountsByFaultName', {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    getCountRequiredSpareParts( dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds ) {

        const params = {
            ...(
                dateStart ? {
                    dateStart: dateStart
                } : {}
            ),
            ...(
                dateEnd ? {
                    dateEnd: dateEnd
                } : {}
            ),
            ...(
                machineClassIds ? {
                    machineClassIds: machineClassIds
                } : {}
            ),
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
            ),
            ...(
                breakdownType ? {
                    breakdownType: breakdownType
                } : {
                    breakdownType: 'year'
                }
            )
        }

        return http.get('/toir/countRequiredSpareParts', {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    }
}