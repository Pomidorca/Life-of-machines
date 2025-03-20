<template>
  <div class="wrapper-technic-statistics">
    <div class="wrapper-technic flex px-2">
      <div v-for="technique in techniques" :key="technique.id" class="item-technic">
        <div class="flex items-center justify-center relative"
             @click="fetchTechniques(technique.machineClassIds), selectTechnique(technique.machineClassIds)"
             :class="{ 'selected-technique': selectedTechniqueId === technique.id }">
          <div class="flex flex-col items-center">
            <img class=" bg-cover bg-center bg-no-repeat rounded-md" :src="technique.image" alt="tech"
                 loading="lazy">
            <p class="item-technic-text py-3">{{ technique.title }}</p>
          </div>
  <!--        <div class="flex flex-col gap-y-2">-->
  <!--          <p class="flex items-center gap-x-1 font-medium text-[#0554F2] leading-5"><img src="/img/tech/Check Circle.svg">-->
  <!--            {{ technique.total }}</p>-->
  <!--          <p class="flex items-center gap-x-1 font-medium text-[#979DAC] leading-5"><img-->
  <!--              src="/img/tech/Danger Circle.svg"> {{ technique.repair }}</p>-->
  <!--        </div>-->
        </div>
      </div>
    </div>
    <div class="wrapper-statistics grid grid-cols-2 gap-6 pb-6 pt-4 px-6">
      <div class="container-working-techniques">
        <div class="chart-working-techniques flex justify-between items-center">
          <div class="chart-working-techniques-selected" :style="{ width: workingWidth }">
            <div class="indicator-percentages text-center">
              {{ workingWidth }}
            </div>
          </div>
          <div v-if="workingWidth !== '100%'" class="chart-divider"></div>
          <div class="chart-working-techniques-secondary" :style="{ width: repairWidth }"></div>
        </div>
        <div class="text-working-techniques flex justify-between items-center">
          <div class="text-working-techniques-title">
            Рабочие
          </div>
          <div class="text-working-techniques-statistic">
            <span class="text-positive">
              {{ getActiveTechnique.total }}
            </span>
            / {{ getActiveTechnique.repair }}
          </div>
        </div>
      </div>
      <div class="container-out-of-order-techniques">
        <div class="chart-out-of-order-techniques flex justify-between items-center">
          <div class="chart-out-of-order-techniques-selected" :style="{ width: repairWidth }">
            <div class="indicator-percentages text-center">
              {{ repairWidth }}
            </div>
          </div>
          <div v-if="repairWidth !== '100%'" class="chart-divider">

          </div>
          <div class="chart-out-of-order-techniques-secondary" :style="{ width: workingWidth }"></div>
        </div>
        <div class="text-out-of-order-techniques flex justify-between items-center">
          <div class="text-out-of-order-techniques-title">
            Вне сторя
          </div>
          <div class="text-out-of-order-techniques-statistic">
            <span class="text-negative">
              {{ getActiveTechnique.repair }}
            </span>
            / {{ getActiveTechnique.total }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import { useActiveStore } from "@/store/active";
import { useMachineStore } from "@/store/machine";
import { useKFVStore } from "@/store/kfv";
import {useTEPStore} from "@/store/tep.js";

const store = useStore();
const techniques = computed(() => store.state.techniques);
const machineStore = useMachineStore();
const kfvStore = useKFVStore();
const activeStore = useActiveStore();
const tepStore = useTEPStore();
const selectedTechniqueId = ref(null);

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

const workingWidth = computed(() => {
  if (!getActiveTechnique.value || !getActiveTechnique.value.total) return '0%';

  const total = parseInt(getActiveTechnique.value.total);
  const repair = parseInt(getActiveTechnique.value.repair || 0);
  const working = total - repair;


  return `${Math.round((working / total) * 100)}%`;
})

const repairWidth = computed(() => {
  if (!getActiveTechnique.value || !getActiveTechnique.value.total) return '0%';

  const total = parseInt(getActiveTechnique.value.total);
  const repair = parseInt(getActiveTechnique.value.repair || 0);

  return `${Math.round((repair / total) * 100)}%`;
})

const getActiveTechnique = computed(() => {
  const activeTechnique = techniques.value.find(technique => technique.id === selectedTechniqueId.value)
  return activeTechnique || 'Не найдено';
})

const saveToLocalStorage = () => {
  localStorage.setItem('CardsTechnique', JSON.stringify({ selectedTechniqueId: selectedTechniqueId.value }));
  localStorage.setItem('selectedMachineTypeIds', JSON.stringify(selectedTechniqueId.value));
};

const selectTechnique = (techniqueId) => {
  if (!techniqueId) return;
  selectedTechniqueId.value = techniqueId;
  saveToLocalStorage();
  activeStore.updateFilterParams({ machineClassIds: techniqueId });
  kfvStore.updateFilterParams({ machineClassIds: techniqueId });
  tepStore.updateFilterParams({ machineClassIds: techniqueId });

  // activeStore.fetchData();

};

const selectedMachineTypeIds = computed({
  get() {
    return machineStore.selectedMachineTypeIds
  },
  set(value) {
    machineStore.selectedMachineTypeIds = value
  },
});

const saveStateToStorage = () => {
  localStorage.setItem('selectedMachineTypeIds', JSON.stringify(selectedMachineTypeIds.value));
};

onMounted(() => {

  const storedCardsTechnique = localStorage.getItem('CardsTechnique');
  if (storedCardsTechnique) {
    try {
      const parsedCardsTechnique = JSON.parse(storedCardsTechnique);

      if (typeof parsedCardsTechnique?.selectedTechniqueId === 'number') {
        selectedTechniqueId.value = parsedCardsTechnique.selectedTechniqueId;
      }
    } catch (error) {
      console.error('Ошибка при загрузке CardsTechnique из localStorage:', error);
    }
  }

  if (!selectedTechniqueId.value) {
    selectedTechniqueId.value = 1;
  }

  selectTechnique(selectedTechniqueId.value);
});



// watch(selectedTechniqueId, (newTechniqueId) => {
//   if (newTechniqueId) {
//
//     fetchTechniques(newTechniqueId);
//   }
// });

const fetchTechniques = async (machineClassIds) => {

  saveStateToStorage();

  machineStore.removeStatusFilter();

  await machineStore.fetchMachines({ machineClassId: machineClassIds });
  selectTechnique(machineClassIds);

};


</script>
