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
            <img v-if="machineMark.models && machineMark.models.length > 0" @click="toggleShowDetail(machineMark)" class="filter-machine-details-list" :class="{ 'open-list': openedMachineMarkId === machineMark.id }" src="/img/filter/Caret_Down_SM.svg" loading="lazy" />
          </div>
          <div v-if="machineMark.models && machineMark.models.length > 0" class="machineTypes-delail" :class="{ 'show-list': openedMachineMarkId === machineMark.id }">
            <div>
              <div v-for=" machineModel in machineMark.models" class=" ms-3 mb-3">
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
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="flex items-center w-full justify-between mb-3">
          <div class="flex gap-x-2">
            <input class="check-input" type="checkbox" id="select-all" @change="toggleSelectAllClass" :checked="isAllSelectedClass">
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
        <div v-for="machineClass in machineStore.machineClass">
          <div class="flex items-center w-full justify-between mb-3">
            <div class="flex gap-x-2">
              <input
                type="checkbox"
                class="check-input"
                :id="machineClass.id"
                :value="machineClass.id"
                v-model="selectedMachineClassIds"
                
              />
              <label :for="machineClass.id">
                  <div class="checkbox">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 11C1 6.28595 1 3.92893 2.46447 2.46447C3.92893 1 6.28595 1 11 1C15.714 1 18.0711 1 19.5355 2.46447C21 3.92893 21 6.28595 21 11C21 15.714 21 18.0711 19.5355 19.5355C18.0711 21 15.714 21 11 21C6.28595 21 3.92893 21 2.46447 19.5355C1 18.0711 1 15.714 1 11Z" stroke="#001233" stroke-opacity="0.6" stroke-width="1.5"/>
                      </svg>
                  </div>
                  <p class="text-[#979DAC]">{{ machineClass.name }}</p>
              </label>
            </div>
            <img @click="toggleShowDetailClass(machineClass)" v-if="machineClass.children && machineClass.children.length > 0" class="filter-machine-details-list" :class="{ 'open-list': openedMachineClassId === machineClass.id }" src="/img/filter/Caret_Down_SM.svg" loading="lazy" />
          </div>
          <div v-if="machineClass.children && machineClass.children.length > 0" class="machineTypes-delail" :class="{ 'show-list': openedMachineClassId === machineClass.id }">
            <div>
              <div v-for=" children in machineClass.children" class=" ms-3 mb-3">
              <input
                type="checkbox"
                class="check-input"
                :id="children.id"
                :value="children.id"
                v-model="selectedMachineModelIds"
              />
              <label :for="children.id">
                  <div class="checkbox">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 11C1 6.28595 1 3.92893 2.46447 2.46447C3.92893 1 6.28595 1 11 1C15.714 1 18.0711 1 19.5355 2.46447C21 3.92893 21 6.28595 21 11C21 15.714 21 18.0711 19.5355 19.5355C18.0711 21 15.714 21 11 21C6.28595 21 3.92893 21 2.46447 19.5355C1 18.0711 1 15.714 1 11Z" stroke="#001233" stroke-opacity="0.6" stroke-width="1.5"/>
                      </svg>
                  </div>
                  <p class="text-[#979DAC]">{{ children.name }}</p>
              </label>
            </div>
            </div>
          </div>
        </div>
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

const machineStore = useMachineStore();
const activeStore = useActiveStore();
const kfvStore = useKFVStore();
const tepStore = useTEPStore();

const selectedTechniqueId = ref(null);
const openedMachineMarkId = ref(null);
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

/*========== class end ========== */

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

const loadSelectedMachineFilter = () => {
  const storedMarksIds = localStorage.getItem('selectedMachineMarkIds');
  const storedModelIds = localStorage.getItem('selectedMachineModelIds');
  if (storedMarksIds) {
    try {
      machineStore.selectedMachineMarksIds = JSON.parse(storedMarksIds);
      machineStore.selectedMachineModelIds = JSON.parse(storedModelIds)
      
    } catch (error) {
      console.error('Ошибка при загрузке selectedMachineMarkIds из localStorage:', error);
    }
  }
}

const isMarkSelected = (machineMark) => {
  
  return machineStore.selectedMachineMarksIds.includes(machineMark.id);
};

const toggleMark = (machineMark) => {
  const allSelected = isMarkSelected(machineMark)

  const modelIds = machineMark.models.map(model => model.id);
  
  
  if(allSelected) {
    
    modelIds.forEach(id => {
      if (!machineStore.selectedMachineModelIds.includes(id)) {
        machineStore.selectedMachineModelIds.push(id);
      }
    });
    
  } else {

    machineStore.selectedMachineModelIds = machineStore.selectedMachineModelIds.filter(id => !modelIds.includes(id));

  }
}

const toggleModelMachines = (machineModel) => {

  const allSelected = isModelSelected(machineModel);

  machineModel.machines.forEach(machine => {
    if (allSelected) {
      
      selectedMachineIds.value = selectedMachineIds.value.filter(id => id !== machine.id);
    } else {
      
      if (!selectedMachineIds.value.includes(machine.id)) {
        selectedMachineIds.value.push(machine.id);
      }
    }
  });
};

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
  [selectedMachineMarkIds, selectedMachineModelIds, selectedMachineClassIds],
  () => {
    machineStore.saveStatusFilter()
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

        machineStore.selectedMachineModelIds =  machineStore.selectedMachineModelIds.filter(id => id !== machineModel.id);
      });
    });
    
  } else {
    
    machineStore.machineMarks.forEach(machineMark => {
      
      machineMark.models.forEach(machineModel => {
        if (!machineStore.selectedMachineModelIds.includes(machineModel.id)) {
            machineStore.selectedMachineModelIds.push(machineModel.id)
        }
      });
    });
  }
};

const saveStateToStorage = () => {
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

onMounted(() => {
    machineStore.fetchMachines();
    loadStateFromStorage();
    loadStateFromLocalStorage();
    loadSelectedMachineFilter();
});

watch(
  () => machineStore.loading,
  (newLoadingValue) => {

    const storedTypeIds = JSON.parse(localStorage.getItem('CardsTechnique')) || [];

    selectedMachineTypeIds.value = storedTypeIds.selectedTechniqueId;

  }
);

watch([selectedMachineTypeIds], saveStateToStorage, { deep: true });
</script>