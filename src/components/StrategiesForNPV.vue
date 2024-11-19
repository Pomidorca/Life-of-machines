<template>
    <div class="flex gap-x-4 items-start">
        <div class="inline-flex flex-col gap-y-2 max-w-[157px]">
            <router-link
                class="px-4 py-1 bg-[#F2F2F2] text-[#979DAC] text-base font-medium rounded-lg border border-[#979DAC]"
                :class="{ 'text-[white] bg-[blue]': $route.query.mode === 'GeneralInformation' }"
                :to="{ name: $route.name, params: { pageName: $route.params.pageName }, query: { mode: 'GeneralInformation' } }">
                Стратегия №1
            </router-link>
            <span
                class="px-4 py-1 bg-[#F2F2F2] text-[10px] leading-3 font-medium rounded-lg border border-[#001233] text-center">текущая
                стратегия <br> обслуживания</span>
        </div>
        <div v-for="item in strategies" :key="item.id">
            <div class="inline-flex flex-col gap-y-2 max-w-[157px]">
                <button
                    class="px-4 py-1 bg-[#F2F2F2] text-[#979DAC] text-base font-medium rounded-lg border border-[#979DAC]">{{ item.title }}</button>
                <span
                    class="px-4 py-1 bg-[#F2F2F2] text-[#979DAC] text-[10px] leading-3 font-medium rounded-lg border border-[#979DAC] text-center">{{ item.description }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
const strategies = [
    {
        id: 2,
        title: 'Стратегия №2',
        description: 'риск-ориентированный подход (роп)',
    },
    {
        id: 3,
        title: 'Стратегия №3',
        description: 'РОП + Инвестиционные вложения (1,9 млрд. руб.)',
    },
    {
        id: 4,
        title: 'Стратегия №4',
        description: 'РОП + Инвестиционные вложения (4,0 млрд. руб.)',
    },
    {
        id: 5,
        title: 'Стратегия №5',
        description: 'РОП + Полное обновление парка ЭАК за 2024-2027 г.',
    }
]
</script>
