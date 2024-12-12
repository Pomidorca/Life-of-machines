<template>
  <div v-for="technique in techniques" :key="technique.id" class="mb-4">
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
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useActiveStore } from "@/store/active";
import { useMachineStore } from "@/store/machine";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const store = useStore();
const techniques = computed(() => store.state.techniques);
const machineStore = useMachineStore();
const activeStore = useActiveStore();
const selectedTechniqueId = ref(null);

const loadStateFromLocalStorage = () => {
  const storedState = localStorage.getItem('TypeTechnique');
  if (storedState) {
    try {
      const parsedState = JSON.parse(storedState);
      selectedTechniqueId.value = parsedState.selectedTechniqueId;
    } catch (error) {
      console.error("Ошибка при загрузке состояния из localStorage:", error);
    }
  }
}

const saveToLocalStorage = () => {
  localStorage.setItem('TypeTechnique', JSON.stringify({ selectedTechniqueId: selectedTechniqueId.value }));
}

const selectTechnique = (technique) => {
  if (technique === undefined) return
  selectedTechniqueId.value = technique;
  activeStore.updateFilterParams({ machineClassIds: route.query.machineClassIds || 1 });
  updateUrl(technique);
  saveToLocalStorage();
};

const updateUrl = (technique) => {
  const newQuery = { ...route.query, machineClassIds: technique };
  router.push({ path: route.path, query: newQuery });
}

onMounted(() => {
  if (techniques.value.length > 0) {
    selectTechnique();
  }
  loadStateFromLocalStorage();
  updateUrl();
})

const fetchTechniques = (machineClassIds) => {
  machineStore.fetchMachines({ machineClassId: machineClassIds });
};
</script>
