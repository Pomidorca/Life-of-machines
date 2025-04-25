import http from '../http-common.js'

export default {
    getVolumeFulfillmentExtraction(dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds) {

        const params = {
            dateStart: dateStart,
            dateEnd: dateEnd,
            // dateStart: '2010-01-01',
            // dateEnd: '2024-12-01'
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

    getMonthlyParkProductivity(dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds) {

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

        if (breakdownType) {
            params.breakdownType = breakdownType
        } else {
            params.breakdownType = 'year'
        }

        return http.get(`/tep/monthlyParkProductivity`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },

    getDinamicsUnitCosts(dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds) {

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

        if (breakdownType) {
            params.breakdownType = breakdownType
        } else {
            params.breakdownType = 'year'
        }

        return http.get(`/tep/dynamicsOfUnitCosts`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    getComparisonOfTargetAndActualUnitCosts(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds) {

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

        return http.get(`/tep/comparisonOfTargetAndActualUnitCosts`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    getDynamicsOfUnitAccumulatedCosts(dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds) {

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

        if (breakdownType) {
            params.breakdownType = breakdownType
        } else {
            params.breakdownType = 'year'
        }

        return http.get(`/tep/dynamicsOfUnitAccumulatedCosts`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    getStructureOfEquipmentOwnershipCosts(dateStart, dateEnd, machineClassIds, machineMarkIds, machineModelIds, machineIds) {

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

        return http.get(`/tep/structureOfEquipmentOwnershipCosts`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
    
    getDynamicsOfUnitAccumulatedCostsWithIndustryReplacement(dateStart, dateEnd, breakdownType, machineClassIds, machineMarkIds, machineModelIds, machineIds) {

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

        if (breakdownType) {
            params.breakdownType = breakdownType
        } else {
            params.breakdownType = 'year'
        }

        return http.get(`/tep/dynamicsOfUnitAccumulatedCostsWithIndustryReplacement`, {
            params,
            paramsSerializer: {
                indexes: false
            }
        });
    },
}