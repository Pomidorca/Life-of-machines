<template>
    <div class="flex gap-8 items-center border-b-[#3d3db6] border-b-2 w-[93vw]">
        <div class="ml-12 flex flex-col items-center font-sans">
            <h4 class="uppercase font-semibold text-center">Весь парк</h4>
            <span class="text-4xl font-bold text-[#3d3db6]">173</span>
            <hr class="w-12 border-2 border-solid border-[#3d3db6]">
            <p class="text-3xl font-semibold text-[#9fbbc6]">15</p>
        </div>
        <div class="flex w-[93vw] justify-between">
            <CardTechnique />
        </div>
    </div>
</template>
<script setup>
    import CardTechnique from './CardsTechnique.vue'
</script>
<style scoped>
</style>