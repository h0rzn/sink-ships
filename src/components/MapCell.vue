<template>
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle ref="circle" :class="[ props.state == 0 ? hoverableCls : fadeOutCls ]" cx="50%" cy="50%" r="25" fill="rgba(0, 0, 0, 0)" stroke="rgba(255, 255, 255, 1)" stroke-width="2"/>
    </svg>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { defineEmits, defineProps } from 'vue';

const props = defineProps<{
    row: number,
    col: number,
    state: number
}>()

const emit = defineEmits(['cell-fired']);
const circle = ref<SVGElement>();
const hoverableCls = ref("hoverable");
const fadeOutCls = ref("fadeout");

onMounted(() => {
    circle.value?.addEventListener("click", (event: MouseEvent) => {
        if (props.state == 0) {
            emit("cell-fired", props.row, props.col);
        }
    })
})

watch(props, () => {
    switch (props.state) {
        case 1: // target miss
            if (circle.value) {
                circle.value.style.stroke = "rgba(255, 255, 255, 0.4)"
            }
            break;
        case 2: // target hit
            if (circle.value) {
                circle.value.style.stroke = "rgba(255, 0, 0, 1)"
            }
            break;
        default: 
            break;
    }
})

</script>

<style>
.hoverable {
    transform-origin: center center;
    transition: transform .2s;
}
.hoverable:hover {
    transform: scale(1.2, 1.2);
}

.fadeout {
    transform-origin: center center;
    transition: transform .2s;
    transform: scale(1, 1);
}
</style>