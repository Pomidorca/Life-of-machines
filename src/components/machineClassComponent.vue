<template>
  <div>
    <div class="flex items-center w-full justify-between mb-3">
      <div class="flex gap-x-2">
        <input
            type="checkbox"
            class="check-input"
            :id="machineClass.id"
            :value="machineClass.id"
            v-model="selectedMachineClassIds"
            @change="toggleClass(machineClass)"
        />
        <label :for="machineClass.id">
          <div class="checkbox">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 11C1 6.28595 1 3.92893 2.46447 2.46447C3.92893 1 6.28595 1 11 1C15.714 1 18.0711 1 19.5355 2.46447C21 3.92893 21 6.28595 21 11C21 15.714 21 18.0711 19.5355 19.5355C18.0711 21 15.714 21 11 21C6.28595 21 3.92893 21 2.46447 19.5355C1 18.0711 1 15.714 1 11Z" stroke="#001233" stroke-opacity="0.6" stroke-width="1.5"/>
            </svg>
          </div>
          <p class="text-[#979DAC]">
            {{ machineClass.name }}
          </p>
        </label>
      </div>
      <img v-if="machineClass.children && machineClass.children.length > 0" @click="toggleList(machineClass.id)" class="filter-machine-details-list cursor-pointer" :class="{ 'open-list': isOpen }" src="/img/filter/Caret_Down_SM.svg" loading="lazy" />
    </div>
    <div v-if="machineClass.children && machineClass.children.length > 0" class="machineTypes-delail" :class="{ 'show-list': isOpen }">
      <div>
        <div v-for=" children in machineClass.children" class=" ms-3 mb-3">
          <MachineClassComponent :machine-class="children"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMachineStore } from '@/store/machine';
import { useActiveStore } from '@/store/active';
import { useKFVStore } from '@/store/kfv';
import { useTEPStore } from "@/store/tep.js";

export default {
  name: 'MachineClassComponent',
  props: {
    machineClass: Object
  },
  data() {
    return {
      isOpen: false,
      machineStore: useMachineStore(),
      activeStore: useActiveStore(),
      kfvStore: useKFVStore(),
      tepStore: useTEPStore(),
    }
  },
  computed: {
    selectedMachineClassIds: {
      get() {
        return this.machineStore.machineClassIds;
      },
      set(value) {
        this.machineStore.machineClassIds = value;
      }
    }
  },
  methods: {
    toggleList() {
      this.isOpen = !this.isOpen;
    },
    isClassSelected(machineClass) {
      return this.machineStore.machineClassIds.includes(machineClass.id)
    },
    getAllParents(machineClass) {
      const parents = [];
      let currentClass = machineClass;

      while (true) {
        const parent = this.findParent(currentClass);

        if (!parent) break;

        parents.push(parent);
        currentClass = parent;

      }
      return parents;
    },

    findParent(childClass) {

      const search = (items) => {
        for (const item of items) {
          if (item.children?.some(c => c.id === childClass.id)) {
            return item;
          }
          const foundInChildren = search(item.children || []);
          if (foundInChildren) return foundInChildren;
        }
        return null;
      };

      return search(this.machineStore.machineClass);
    },

    updateAllParentsState(machineClass) {
      const allParents = this.getAllParents(machineClass);

      allParents.reverse().forEach(parent => {
        const allChildren = this.getAllChildren(parent);
        const allChildrenSelected = allChildren.every(child =>
            this.selectedMachineClassIds.includes(child.id)
        );

        if (allChildrenSelected) {
          if (!this.selectedMachineClassIds.includes(parent.id)) {
            this.selectedMachineClassIds.push(parent.id);
          }
        } else {
          this.selectedMachineClassIds = this.selectedMachineClassIds.filter(id => id !== parent.id);
        }
      });
    },

    toggleClass(machineClass) {

      const allChildren = this.getAllChildren(machineClass)

      const allParents = this.getAllParents(machineClass);

      if (this.isClassSelected(machineClass)) {

        if (!this.selectedMachineClassIds.includes(machineClass.id)){
          this.selectedMachineClassIds.push(machineClass.id)
        }
        allChildren.forEach(child => {
          if (!this.selectedMachineClassIds.includes(child.id)) {
            this.selectedMachineClassIds.push(child.id);
          }
        });
        allParents.forEach(child => {
          if (!this.selectedMachineClassIds.includes(child.id)) {
            this.selectedMachineClassIds.push(child.id);
          }
        })
      } else {
        this.selectedMachineClassIds = this.selectedMachineClassIds.filter(id => !allChildren.some(child => child.id === id));
      }

      this.updateAllParentsState(machineClass);

      this.saveStateToStorage();
    },
    getAllChildren(machineClass) {
      const children = [];
      function recursiveGetChildren(classItem) {
        if (classItem.children) {
          classItem.children.forEach(child => {
            children.push(child);
            recursiveGetChildren(child);
          });
        }
      }
      recursiveGetChildren(machineClass);
      return children;
    },
    saveStateToStorage() {
      this.machineStore.saveStatusFilter()
      this.activeStore.updateFilterParams({
        machineClassIds: this.selectedMachineClassIds,
      });
      this.kfvStore.updateFilterParams({
        machineClassIds: this.selectedMachineClassIds,
      });

      this.tepStore.updateFilterParams({
        machineClassIds: this.selectedMachineClassIds,
      });
    }
  }
}
</script>

