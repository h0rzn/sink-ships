<template>
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle ref="circle" :class="[ props.state == 0 ? hoverableCls : fadeOutCls ]" cx="50%" cy="50%" r="25" fill="rgba(0, 0, 0, 0)" stroke="rgba(255, 255, 255, 1)" stroke-width="2"/>
    </svg>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { CellState } from '@/GameHelpers';

const props = defineProps<{
    row: number,
    col: number,
    state: number 
}>()

const emit = defineEmits(['click', 'hover']);
const circle = ref<SVGElement>();
const hoverableCls = ref("hoverable");
const fadeOutCls = ref("fadeout");

onMounted(() => {
    updateStyle(props.state);

    circle.value?.addEventListener("click", () => {
        if (props.state == CellState.raw || props.state == CellState.marked) {
            emit("click", props.row, props.col);
        }
    })

    circle.value?.addEventListener("mouseover", () => {
        emit("hover", props.row, props.col)
    })
})

const updateStyle = (state: number) => {
    if (!circle.value) {
        return
    }
    switch (state) {
        case 0:
            circle.value.style.stroke = "rgba(255, 255, 255, 1)";
            circle.value.style.fill = "rgba(0, 0, 0, 0)";
            break;
        case 1:
            circle.value.style.stroke = "rgba(255, 255, 255, 0.4)";
            circle.value.style.fill = "rgba(0, 0, 0, 0)";
            break;
        case 2:
            circle.value.style.stroke = "rgba(255, 0, 0, 1)";
            circle.value.style.fill = "rgba(0, 0, 0, 0)";
            break;
        case 3:
            circle.value.style.fill = "rgba(0, 255, 0, 1)"
            break;
        default:
            break;
    }
}

watch(props, (update) => {
    updateStyle(update.state)
})

defineExpose({updateStyle})

</script>

<style>
.hoverable {
    transform-origin: center center;
    transition: transform .2s;
}
.hoverable:hover {
    transform: scale(1.1, 1.1);
}

.fadeout {
    transform-origin: center center;
    transition: transform .2s;
    transform: scale(1, 1);
}
</style>