<template>
    <div class="flex gap-x-2">

        <div class="drop-shadow-2xl rounded-2xl px-3 py-2 bg-white inline-flex">
            <div class="flex flex-col items-start justify-center">
                <h3 class="text-center text-sm font-semibold leading-4 text-[#001233] mx-auto">КТГ</h3>
                <div class="flex items-center gap-x-2 mt-2">
                    <div class="pie" style="--p:25;--c:#0554F2;--b:5px"> 25.0%</div>
                    <div class="flex flex-col items-center">
                        <p class="font-medium text-xs text-[#979DAC]">План <span
                                class="text-sm text-[#001233] font-semibold">0.60</span></p>
                        <p class="font-medium text-xs text-[#979DAC]">Факт <span
                                class="text-sm text-[#0554F2] font-semibold">0.45</span></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="drop-shadow-2xl rounded-2xl px-3 py-2 bg-white inline-flex">
            <div class="flex flex-col items-start justify-center">
                <h3 class="text-center text-sm font-semibold leading-4 text-[#001233] mx-auto">КИО</h3>
                <div class="flex items-center gap-x-2 mt-2">
                    <div class="pie" style="--p:25;--c:#0554F2;--b:5px"> 25.0%</div>
                    <div class="flex flex-col items-center">
                        <p class="font-medium text-xs text-[#979DAC]">План <span
                                class="text-sm text-[#001233] font-semibold">0.60</span></p>
                        <p class="font-medium text-xs text-[#979DAC]">Факт <span
                                class="text-sm text-[#0554F2] font-semibold">0.45</span></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="drop-shadow-2xl rounded-2xl px-3 py-2 bg-white inline-flex w-[92px] justify-center">
            <div class="flex flex-col items-start justify-between">
                <h3 class="text-center text-sm font-semibold leading-4 text-[#001233] mx-auto">MTBF</h3>
                <span class="text-[#979DAC] text-sm leading-4 font-semibold text-center">420ч 36 <br>мин</span>
            </div>
        </div>

        <div class="drop-shadow-2xl rounded-2xl px-3 py-2 bg-white inline-flex w-[92px] justify-center">
            <div class="flex flex-col items-start justify-between">
                <h3 class="text-center text-sm font-semibold leading-4 text-[#001233] mx-auto">MTTF</h3>
                <span class="text-[#979DAC] text-sm leading-4 font-semibold text-center">420ч 36 <br>мин</span>
            </div>
        </div>

        <div class="drop-shadow-2xl rounded-2xl px-3 py-2 bg-white inline-flex w-[92px] justify-center">
            <div class="flex flex-col items-start justify-between">
                <h3 class="text-center text-sm font-semibold leading-4 text-[#001233] mx-auto">MTBF</h3>
                <span class="text-[#979DAC] text-sm leading-4 font-semibold text-center">600ч 5 <br>мин</span>
            </div>
        </div>

        <div class="drop-shadow-2xl rounded-2xl px-3 py-2 bg-white inline-flex w-[92px] justify-center">
            <div class="flex flex-col items-start justify-between">
                <h3 class="text-center text-sm font-semibold leading-4 text-[#001233] mx-auto">Y</h3>
                <span class="text-[#979DAC] text-sm leading-4 font-semibold text-center">420ч 36 <br>мин</span>
            </div>
        </div>

        <div class="drop-shadow-2xl rounded-2xl px-3 py-2 bg-white inline-flex w-[92px] justify-center">
            <div class="flex flex-col items-start justify-between">
                <h3 class="text-center text-sm font-semibold leading-4 text-[#001233] mx-auto">КАВфакт</h3>
                <div class="flex flex-col items-center gap-y-1">
                    <p class="font-medium text-xs text-[#979DAC]">План <span
                            class="text-sm text-[#001233] font-semibold">0.3</span></p>
                    <p class="font-medium text-xs text-[#979DAC]">Факт <span
                            class="text-sm text-[#0554F2] font-semibold">0.26</span></p>
                </div>
            </div>
        </div>

        <div class="drop-shadow-2xl rounded-2xl px-3 py-2 bg-white inline-flex w-[92px] justify-center">
            <div class="flex flex-col items-start justify-between">
                <h3 class="text-center text-sm font-semibold leading-4 text-[#001233] mx-auto">Тсл</h3>
                <span class="text-[#979DAC] text-sm leading-4 font-semibold text-center">2000 ч</span>
            </div>
        </div>

    </div>
</template>

<style scoped>
@property --p {
    syntax: '<number>';
    inherits: true;
    initial-value: 0;
}

.pie {
    --p: 20;
    --b: 5px;
    --c: darkred;
    --w: 48px;

    width: var(--w);
    aspect-ratio: 1;
    position: relative;
    display: inline-grid;
    margin: 5px;
    place-content: center;
    font-size: 12px;
    color: #0554F2;
    font-weight: bold;
    font-family: sans-serif;
}

.pie:before,
.pie:after {
    content: "";
    position: absolute;
    border-radius: 50%;
}

.pie:before {
    inset: 0;
    background:
        radial-gradient(farthest-side, var(--c) 98%, #0000) top/var(--b) var(--b) no-repeat,
        conic-gradient(var(--c) calc(var(--p)*1%), #0000);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(99% - var(--b)), #000 calc(100% - var(--b)));
    mask: radial-gradient(farthest-side, #0000 calc(99% - var(--b)), #000 calc(100% - var(--b)));
}

.pie:after {
    inset: calc(50% - var(--b)/2);
    background: var(--c);
    transform: rotate(calc(var(--p)*3.6deg)) translateY(calc(50% - var(--w)/2));
}

.animate {
    animation: p 1s .5s both;
}

.no-round:before {
    background-size: 0 0, auto;
}

.no-round:after {
    content: none;
}

@keyframes p {
    from {
        --p: 0
    }
}
</style>