<template>
  <div v-for="technique in techniques" :key="technique.id" class="space-y-4">
    <div class="flex items-center gap-x-3.5 relative p-2"
      @click="fetchTechniques(technique.machineClassIds), selectTechnique(technique.machineClassIds)"
      :class="{ 'selected-technique': selectedTechniqueId === technique.id }">
      <div class="flex flex-col items-center gap-y-0.5">
        <img class="w-[64px] h-[64px] bg-cover bg-center bg-no-repeat rounded-md" :src="technique.image" alt="tech">
        <p class="text-[#001233] text-xs font-normal">{{ technique.title }}</p>
      </div>
      <div class="flex flex-col gap-y-2">
        <p class="flex items-center gap-x-1 font-medium text-[#0554F2] leading-5"><img src="/img/tech/Check Circle.svg">
          {{ technique.total }}</p>
        <p class="flex items-center gap-x-1 font-medium text-[#979DAC] leading-5"><img
            src="/img/tech/Danger Circle.svg"> {{ technique.repair }}</p>
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

const store = useStore();
const techniques = computed(() => store.state.techniques);
const machineStore = useMachineStore();
const kfvStore = useKFVStore();
const activeStore = useActiveStore();
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

const saveToLocalStorage = () => {
  localStorage.setItem('CardsTechnique', JSON.stringify({ selectedTechniqueId: selectedTechniqueId.value }));
};

const selectTechnique = (techniqueId) => {
  if (!techniqueId) return;
  selectedTechniqueId.value = techniqueId;
  activeStore.updateFilterParams({ machineClassIds: techniqueId });
  kfvStore.updateFilterParams({ machineClassIds: techniqueId });
  saveToLocalStorage();
  activeStore.fetchData();

};


onMounted(() => {
  loadStateFromLocalStorage();

  if (!selectedTechniqueId.value && techniques.value.length > 0) {
    const initialTechnique = techniques.value[0].id;
    selectTechnique(initialTechnique);
  } else if (selectedTechniqueId.value) {
    selectTechnique(selectedTechniqueId.value);
  }

});


watch(selectedTechniqueId, (newTechniqueId) => {
  if (newTechniqueId) {
    fetchTechniques(newTechniqueId);
  }
});

const fetchTechniques = (machineClassIds) => {
  machineStore.fetchMachines({ machineClassId: machineClassIds });
};

</script>
