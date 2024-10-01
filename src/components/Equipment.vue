<template>
    <div class="flex items-center gap-y-3 gap-x-2" v-for="equipment in $store.state.equipments" :key="equipment.id">
        <input type="checkbox">
        <label class="text-[#979DAC]">{{ equipment.title }}</label>
    </div>
</template>
<script setup>

</script>
<style>

</style>