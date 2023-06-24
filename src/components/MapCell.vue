<template>
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle :class="[ unfired ? unfiredClass : firedClass ]" @click="$emit('cellFired', $event)" ref="circle" cx="50%" cy="50%" r="25" fill="rgba(0, 0, 0, 0)" stroke="#fff"/>
    </svg>
</template>

<script setup lang="ts">
import { onMounted, ref, defineEmits, defineProps } from 'vue';

defineProps<{
    x: number,
    y: number
}>()

const emits = defineEmits(['cellFired']);

const circle = ref<SVGElement>();
const unfired = ref<boolean>(true);
const unfiredClass = ref('cell-hoverable')
const firedClass = ref('cell-fired')

onMounted(() => {
    circle.value?.addEventListener("click", (event: MouseEvent) => {
        if (unfired.value) {
            const el = event.target as HTMLElement;
            el.style.fill = "#fff";
            unfired.value = false;
        }
    })
})

</script>

<style>
.cell-hoverable {
    transform-origin: center center;
    transition: transform .2s;
}
.cell-hoverable:hover {
    transform: scale(1.2, 1.2);
}

.cell-fired {
    transform-origin: center center;
    transition: transform .3s;
    fill: blueviolet;
}
.cell-fired:hover {
    transform: scale(1, 1);
}
</style>