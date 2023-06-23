<template>
    <!-- <div class="cell"> -->
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle @click="$emit('cellFired', $event)" ref="circle" class="cell-icon" cx="50%" cy="50%" r="25" fill="rgba(0, 0, 0, 0)" stroke="#fff"/>

    </svg>
    <!-- </div> -->
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits, defineProps } from 'vue';

defineProps<{
    x: number,
    y: number
}>()

const emits = defineEmits(['cellFired']);

const circle = ref<SVGElement>();


// const setMiss = () => {}

// const setHit = () => {}

onMounted(() => {
    circle.value?.addEventListener("click", (event: MouseEvent) => {
        const el = event.target as HTMLElement;
        el.style.fill = "#fff";
    })
})

</script>

<style>
.cell-icon {
    transform-origin: center center;
    transition: transform .2s;
}
.cell-icon:hover {
    transform: scale(1.2, 1.2);
}

</style>