<template>
    <div 
        ref="cell"
        class="cell"
        :class="{ 'miss': props.state === 1 }"
        @click="onClick"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
    ><span></span></div>

</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const cell = ref();

const marked = ref<boolean>(false)

const mark = () => {
    console.log("mark")
    marked.value = true;
}

const unmark = () => {
    console.log("unmark")
    marked.value = false;
}

const props = defineProps<{
    row: number,
    col: number,
    state: number;
}>()

const emit = defineEmits(['cell-click', 'cell-hover', 'cell-hover-leave']);

// onMounted(() => {
    
// })

const onClick = (event: MouseEvent) => {
    emit("cell-click", props.row, props.col);
}

const onMouseOver = (event: MouseEvent) => {
    emit("cell-hover", props.row, props.col);
}

const onMouseLeave = (event: MouseEvent) => {
    emit("cell-hover-leave", props.row, props.col);
}

watch(props, (update) => {
    mark();
})


defineExpose({mark, unmark})

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


.cell {
    display: flex;
    user-select: none;
    position: relative;
    border: 1px solid #1f1f1f;
    background: transparent;
    align-items: center;
    justify-content: center;
}

.cell:hover {
    background: #b4b4b4;
}

.cell span {
    position: absolute;
    border-radius: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1f1f1f;
    color: rgb(165, 165, 165);
    height: 90%;
    width: 90%; 
    top: 50%;
    transform: translate(0, -50%);
}

.hit {
    background: linear-gradient(121deg, rgba(35,255,149,1) 0%, rgba(25,189,110,1) 58%);
    border: 1px solid rgb(35,255,149);
}

.miss {
    background: rgb(210,210,210);
    background: linear-gradient(120deg, rgba(210,210,210,1) 0%, rgba(160,160,160,1) 58%);
}
/*
.active {
    background: rgb(35,255,149);
    background: linear-gradient(121deg, rgba(35,255,149,1) 0%, rgba(25,189,110,1) 58%);
} */

</style>