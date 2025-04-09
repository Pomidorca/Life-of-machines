<template>
  <div class="relative">
    <div class="duration-300" v-if="machineStore.loading">Загрузка...</div>
    <div v-else-if="machineStore.error">Ошибка: {{ machineStore.error.message }}</div>
    <div v-else class="flex flex-col">
      <div v-if="selectedMachineTypeIds !== 1">
        <div class="flex items-center w-full justify-between mb-3">
          <div class="flex gap-x-2">
            <input class="check-input" type="checkbox" id="select-all" @change="toggleSelectAll" :checked="isAllSelected">
            <label for="select-all">
              <div class="checkbox">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11C1 6.28595 1 3.92893 2.46447 2.46447C3.92893 1 6.28595 1 11 1C15.714 1 18.0711 1 19.5355 2.46447C21 3.92893 21 6.28595 21 11C21 15.714 21 18.0711 19.5355 19.5355C18.0711 21 15.714 21 11 21C6.28595 21 3.92893 21 2.46447 19.5355C1 18.0711 1 15.714 1 11Z" stroke="#001233" stroke-opacity="0.6" stroke-width="1.5"/>
                  </svg>
              </div>
              <p class="text-[#979DAC]">Выбрать все</p>
            </label>
          </div>
        </div>
        <div v-for="machineMark in machineStore.machineMarks">
          <div class="flex items-center w-full justify-between mb-3">
            <div class="flex gap-x-2">
              <input
                type="checkbox"
                class="check-input"
                :id="machineMark.id"
                :value="machineMark.id"
                v-model="selectedMachineMarkIds"
                @change="toggleMark(machineMark)"
              />
              <label :for="machineMark.id">
                  <div class="checkbox">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 11C1 6.28595 1 3.92893 2.46447 2.46447C3.92893 1 6.28595 1 11 1C15.714 1 18.0711 1 19.5355 2.46447C21 3.92893 21 6.28595 21 11C21 15.714 21 18.0711 19.5355 19.5355C18.0711 21 15.714 21 11 21C6.28595 21 3.92893 21 2.46447 19.5355C1 18.0711 1 15.714 1 11Z" stroke="#001233" stroke-opacity="0.6" stroke-width="1.5"/>
                      </svg>
                  </div>
                  <p class="text-[#979DAC]">{{ machineMark.name }}</p>
              </label>
            </div>
            <img v-if="machineMark.models && machineMark.models.length > 0" @click="toggleShowDetail(machineMark)" class="filter-machine-details-list cursor-pointer" :class="{ 'open-list': openedMachineMarkId === machineMark.id }" src="/img/filter/Caret_Down_SM.svg" loading="lazy" />
          </div>
          <div v-if="machineMark.models && machineMark.models.length > 0" class="machineTypes-delail" :class="{ 'show-list': openedMachineMarkId === machineMark.id }">
            <div>
              <div v-for=" machineModel in machineMark.models" class=" ms-3 mb-3">
                <div class="flex items-center w-full justify-between mb-3">
                  <div class="flex gap-x-2">
                    <input
                        type="checkbox"
                        class="check-input"
                        :id="machineModel.id"
                        :value="machineModel.id"
                        v-model="selectedMachineModelIds"
                        @change="toggleModelMachines(machineModel)"
                    />
                    <label :for="machineModel.id">
                      <div class="checkbox">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 11C1 6.28595 1 3.92893 2.46447 2.46447C3.92893 1 6.28595 1 11 1C15.714 1 18.0711 1 19.5355 2.46447C21 3.92893 21 6.28595 21 11C21 15.714 21 18.0711 19.5355 19.5355C18.0711 21 15.714 21 11 21C6.28595 21 3.92893 21 2.46447 19.5355C1 18.0711 1 15.714 1 11Z" stroke="#001233" stroke-opacity="0.6" stroke-width="1.5"/>
                        </svg>
                      </div>
                      <p class="text-[#979DAC]">{{ machineModel.name }}</p>
                    </label>
                  </div>
                  <img v-if="machineModel.machines && machineModel.machines.length > 0" @click="toggleShowDetailInventoryNumber(machineModel)" class="filter-machine-details-list cursor-pointer" :class="{ 'open-list': openedMachineId === machineModel.id }" src="/img/filter/Caret_Down_SM.svg" loading="lazy" />
                </div>
                <div v-if="machineModel.machines && machineModel.machines.length > 0" class="machineTypes-delail" :class="{ 'show-list': openedMachineId === machineModel.id }">
                  <div>
                    <div v-for="machine in machineModel.machines" class="ms-3 mb-3">
                      <input
                          type="checkbox"
                          class="check-input"
                          :id="machine.id"
                          :value="machine.id"
                          v-model="selectedMachineIds"
                          @change="toggleMachines(machine)"
                      />
                      <label :for="machine.id">
                        <div class="checkbox">
                          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 11C1 6.28595 1 3.92893 2.46447 2.46447C3.92893 1 6.28595 1 11 1C15.714 1 18.0711 1 19.5355 2.46447C21 3.92893 21 6.28595 21 11C21 15.714 21 18.0711 19.5355 19.5355C18.0711 21 15.714 21 11 21C6.28595 21 3.92893 21 2.46447 19.5355C1 18.0711 1 15.714 1 11Z" stroke="#001233" stroke-opacity="0.6" stroke-width="1.5"/>
                          </svg>
                        </div>
                        <p class="text-[#979DAC]">{{ machineModel.name }}-{{ machine.inventoryNumber }}</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <MachineClassComponent v-for="( item ) in machineStore.machineClass" :key="item.id" :machine-class="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMachineStore } from '@/store/machine';
import { onMounted, watch, ref, computed } from 'vue';
import { useActiveStore } from '@/store/active';
import { useKFVStore } from '@/store/kfv';
import { useTEPStore } from "@/store/tep.js";
import MachineClassComponent from '@/components/machineClassComponent.vue'

const machineStore = useMachineStore();
const activeStore = useActiveStore();
const kfvStore = useKFVStore();
const tepStore = useTEPStore();

const selectedTechniqueId = ref(null);
const openedMachineMarkId = ref(null);
const openedMachineId = ref(null);
const openedMachineClassId = ref(null);

const loadStateFromLocalStorage = () => {
  
  const storedState = localStorage.getItem('CardsTechnique');
  if (storedState) {
    try {
      const parsedState = JSON.parse(storedState);
      selectedTechniqueId.value = parsedState.selectedTechniqueId;
    } catch (error) {
      console.error("Ошибка при загрузке состояния из localStorage:", error);
    }
  }
};

/*========== class start ========== */

const selectedMachineClassIds = computed({
    get() {
        return machineStore.machineClassIds
    },
    set(value) {
        machineStore.machineClassIds = value
    },
});

const toggleShowDetailClass = (machineClass) => {
  if (openedMachineClassId.value === machineClass.id) {
    openedMachineClassId.value = null;
  } else {
    
    openedMachineClassId.value = machineClass.id;
  }
};

const isAllSelectedClass = computed(() => {
  return machineStore.machineClass.every(machineClass => {
    return machineClass.children.every(children => machineStore.machineClassIds.includes(children.id));
  });
});

const toggleSelectAllClass = () => {
  
  if (isAllSelectedClass.value) {
    
    machineStore.machineClass.forEach(machineClass => {
      
      machineClass.children.forEach(children => {

        machineStore.machineClassIds =  machineStore.machineClassIds.filter(id => id !== children.id);
      });
    });
    
  } else {
    
    machineStore.machineClass.forEach(machineClass => {
      
      machineClass.children.forEach(children => {
        if (!machineStore.machineClassIds.includes(children.id)) {
            machineStore.machineClassIds.push(children.id)
        }
      });
    });
  }
};

watch(selectedMachineClassIds, () => {
  machineStore.machineClass.forEach(machineClass => {

    // problem

    const allClassesSelected = machineClass.children.every(children => selectedMachineModelIds.value.includes(children.id));

        // Commented out before fix structure API request 
        
        // if (allClassesSelected && !machineStore.selectedMachineClassIds.includes(children.id)) {
        //   console.log('выбрано все');
          
        //     if(!machineStore.selectedMachineClassIds.includes(children.id)) {
        //       machineStore.selectedMachineClassIds.push(children.id)
        //     }
        // } else if (!allClassesSelected && machineStore.selectedMachineClassIds.includes(children.id)) {
            
        //     machineStore.selectedMachineClassIds = machineStore.selectedMachineClassIds.filter(id => id != children.id);
        // }
        
      })
}, { deep: true });

/*========== class end ========== */

/*========== switching between the filter type ========== */


/*========== marks start ========== */

const selectedMachineMarkIds = computed({
    get() {
        return machineStore.selectedMachineMarksIds
    },
    set(value) {
        machineStore.selectedMachineMarksIds = value
    },
});

const selectedMachineModelIds = computed({
    get() {
        return machineStore.selectedMachineModelIds
    },
    set(value) {
        machineStore.selectedMachineModelIds = value
    },
});

const selectedMachineIds = computed({
  get() {
    return machineStore.selectedMachineIds
  },
  set(value) {
    machineStore.selectedMachineIds = value
  },
});

// const loadSelectedMachineFilter = () => {
//   const storedMarksIds = localStorage.getItem('selectedMachineMarkIds');
//   const storedModelIds = localStorage.getItem('selectedMachineModelIds');
//   if (storedMarksIds) {
//     try {
//       machineStore.selectedMachineMarksIds = JSON.parse(storedMarksIds);
//       machineStore.selectedMachineModelIds = JSON.parse(storedModelIds)
//
//     } catch (error) {
//       console.error('Ошибка при загрузке selectedMachineMarkIds из localStorage:', error);
//     }
//   }
// }

const isMarkSelected = (machineMark) => {
  
  return machineStore.selectedMachineMarksIds.includes(machineMark.id);
};

const toggleMark = (machineMark) => {
  const allSelected = isMarkSelected(machineMark);

  machineMark.models.forEach(machineModel => {
    if (allSelected) {

      if (!machineStore.selectedMachineModelIds.includes(machineModel.id)) {
        machineStore.selectedMachineModelIds.push(machineModel.id);
      }

      machineModel.machines.forEach(machine => {
        if (!machineStore.selectedMachineIds.includes(machine.id)) {
          machineStore.selectedMachineIds.push(machine.id);
        }
      });
    } else {

      machineStore.selectedMachineModelIds = machineStore.selectedMachineModelIds.filter(modelId => modelId !== machineModel.id);

      machineModel.machines.forEach(machine => {
        machineStore.selectedMachineIds = machineStore.selectedMachineIds.filter(machineId => machineId !== machine.id);
      });
    }
  });
};


const toggleModelMachines = (machineModel) => {
  const isModelSelected = machineStore.selectedMachineModelIds.includes(machineModel.id);

  if (isModelSelected) {
    machineModel.machines.forEach(machine => {
      if (!machineStore.selectedMachineIds.includes(machine.id)) {
        machineStore.selectedMachineIds.push(machine.id);
      }
    });
  } else {
    machineModel.machines.forEach(machine => {
      machineStore.selectedMachineIds = machineStore.selectedMachineIds.filter(id => id !== machine.id);
    });
  }
};

const isMachinesSelected = (machineWithInventoryNumber) => {

  return machineStore.selectedMachineIds.includes(machineWithInventoryNumber.id);
};

const toggleMachines = (machineWithInventoryNumber) => {
  // console.log('dag')
  // const allSelected = isMachinesSelected(machineWithInventoryNumber);
  // console.log('dag', allSelected)
  // if (allSelected) {
  //
  //   console.log('выбраны все')
  // } else {
  //
  //   console.log('выбраны не все')
  // }
}

watch(selectedMachineIds, () => {
  machineStore.machineMarks.forEach(machineMark => {
    machineMark.models.forEach(machineModel => {

      const allMachinesSelected = machineModel.machines.every(machine => selectedMachineIds.value.includes(machine.id));

      if (allMachinesSelected) {
        if (!machineStore.selectedMachineModelIds.includes(machineModel.id)) {
          machineStore.selectedMachineModelIds.push(machineModel.id);
        }
      } else {

        machineStore.selectedMachineModelIds = machineStore.selectedMachineModelIds.filter(id => id !== machineModel.id);
      }
    });
  });
}, { deep: true });

watch(selectedMachineModelIds, () => {

  machineStore.machineMarks.forEach(machineMark => {

    const allModelsSelected = machineMark.models.every(model => selectedMachineModelIds.value.includes(model.id));

    if (allModelsSelected && !machineStore.selectedMachineMarksIds.includes(machineMark.id)) {


      if(!machineStore.selectedMachineMarksIds.includes(machineMark.id)) {
        machineStore.selectedMachineMarksIds.push(machineMark.id)
      }
      } else if (!allModelsSelected && machineStore.selectedMachineMarksIds.includes(machineMark.id)) {

        machineStore.selectedMachineMarksIds = machineStore.selectedMachineMarksIds.filter(id => id != machineMark.id);
      }

      })
}, { deep: true });

watch(
    [selectedMachineIds],
    async () => {
      if (machineStore.loading) return

      console.log('request', selectedMachineIds.value, selectedMachineMarkIds.value, selectedMachineModelIds.value, selectedMachineClassIds.value);
      console.log('request')
      await machineStore.saveStatusFilter();
      await saveStateToStorage();
    },
    { deep: true }
);


const toggleShowDetail = (machineMark) => {
  if (openedMachineMarkId.value === machineMark.id) {
    openedMachineMarkId.value = null;
  } else {
    
    openedMachineMarkId.value = machineMark.id;
  }
};

const toggleShowDetailInventoryNumber = (machine) => {
  if (openedMachineId.value === machine.id) {
    openedMachineId.value = null;
  } else {

    openedMachineId.value = machine.id;
  }
};

/* ========== marks end ========== */

const selectedMachineTypeIds = computed({
    get() {
        return machineStore.selectedMachineTypeIds
    },
    set(value) {
        machineStore.selectedMachineTypeIds = value
    },
});

const isAllSelected = computed(() => {
  return machineStore.machineMarks.every(machineMark => {
    return machineMark.models.every(machineModel => machineStore.selectedMachineModelIds.includes(machineModel.id));
  });
});

const toggleSelectAll = () => {
  if (isAllSelected.value) {

    machineStore.machineMarks.forEach(machineMark => {
      machineMark.models.forEach(machineModel => {

        machineStore.selectedMachineModelIds = machineStore.selectedMachineModelIds.filter(modelId => modelId !== machineModel.id);

        machineModel.machines.forEach(machine => {
          machineStore.selectedMachineIds = machineStore.selectedMachineIds.filter(machineId => machineId !== machine.id);
        });
      });
    });
  } else {

    machineStore.machineMarks.forEach(machineMark => {
      machineMark.models.forEach(machineModel => {

        if (!machineStore.selectedMachineModelIds.includes(machineModel.id)) {
          machineStore.selectedMachineModelIds.push(machineModel.id);
        }

        machineModel.machines.forEach(machine => {
          if (!machineStore.selectedMachineIds.includes(machine.id)) {
            machineStore.selectedMachineIds.push(machine.id);
          }
        });
      });
    });
  }
};

const saveStateToStorage = () => {
    localStorage.setItem('selectedMachineMarkIds', JSON.stringify(selectedMachineMarkIds.value));
    localStorage.setItem('selectedMachineModelIds', JSON.stringify(selectedMachineModelIds.value));
    localStorage.setItem('selectedMachineIds', JSON.stringify(selectedMachineIds.value));
    localStorage.setItem('selectedMachineTypeIds', JSON.stringify(selectedMachineTypeIds.value));
    activeStore.updateFilterParams({
        machineTypeIds: selectedMachineTypeIds.value,
    });
    kfvStore.updateFilterParams({
        machineTypeIds: selectedMachineTypeIds.value,
    });
    tepStore.updateFilterParams({
        machineTypeIds: selectedMachineTypeIds.value,
    });
};


const loadStateFromStorage = () => {
    try {
        const storedTypeIds = JSON.parse(localStorage.getItem('selectedMachineTypeIds')) || [];

        selectedMachineTypeIds.value = storedTypeIds;
        activeStore.machineTypeIds = [...storedTypeIds];
    } catch (error) {
        console.error('Ошибка при загрузке состояния:', error);
    }
};


const selectAllMachinesOfType = (machineType) => {
  const machineIds = machineType.machines.map(machine => machine.id);
  machineIds.forEach(machineId => {
    if (!selectedMachineTypeIds.value.includes(machineId)) {
      selectedMachineTypeIds.value.push(machineId);
    }
  });
};

const unselectAllMachinesOfType = (machineType) => {
  const machineIds = machineType.machines.map(machine => machine.id);
  selectedMachineTypeIds.value = selectedMachineTypeIds.value.filter(id => !machineIds.includes(id));
};

const handleClick = (machineType) => {
    machineType.showDetails = !machineType.showDetails;

    if (machineType.showDetails) {
    
      selectAllMachinesOfType(machineType);
    } else {
      
      unselectAllMachinesOfType(machineType);
    }
};

onMounted(async () => {
  const machineClassIds = localStorage.getItem('selectedMachineTypeIds') || 1;
  await machineStore.fetchMachines({ machineClassId: machineClassIds });
  loadStateFromStorage();
  loadStateFromLocalStorage();
  // loadSelectedMachineFilter();

  const storedMarkIds = localStorage.getItem('selectedMachineMarkIds');
  const storedModelIds = localStorage.getItem('selectedMachineModelIds');
  const storedMachineIds = localStorage.getItem('selectedMachineIds');

  if (storedMarkIds) {
    machineStore.selectedMachineMarksIds = JSON.parse(storedMarkIds);
  }
  if (storedModelIds) {
    machineStore.selectedMachineModelIds = JSON.parse(storedModelIds);
  }
  if (storedMachineIds) {
    machineStore.selectedMachineIds = JSON.parse(storedMachineIds);
  }
});

watch(
  () => machineStore.loading,
  (newLoadingValue) => {

    const storedTypeIds = JSON.parse(localStorage.getItem('CardsTechnique')) || [];

    selectedMachineTypeIds.value = storedTypeIds.selectedTechniqueId;

  }
);

// watch([selectedMachineTypeIds], saveStateToStorage, { deep: true });
</script>