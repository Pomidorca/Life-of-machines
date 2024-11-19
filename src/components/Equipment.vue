<template>
    <div class="flex flex-col" v-for="equipment in $store.state.equipments" :key="equipment.id">
        <div class="flex items-center w-full justify-between mb-3">
            <label class="text-[#979DAC]">{{ equipment.title }}</label>
            <button @click="handleClick(equipment)"><img v-if="!equipment.showUnderName"
                    src="/img/filter/Caret_Down_SM.svg" alt=""><img v-if="equipment.showUnderName"
                    src="/img/filter/Caret_Up_SM.svg" alt=""></button>
        </div>

        <div v-if="equipment.showUnderName">
            <div class="flex mb-3 ml-6" v-for="item in equipment.UnderName" :key="item.id">
                <input class="rounded-lg" type="checkbox">
                <label class="text-[#979DAC] ml-2">{{ item.name }}</label>
            </div>
        </div>
    </div>
</template>

<script setup>
const handleClick = (equipment) => {
    equipment.showUnderName = !equipment.showUnderName;
};
</script>