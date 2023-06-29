<template>
    <div ref="ship" id="ship" :style="style"></div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { Position, useDraggable } from '@vueuse/core';

const ship = ref<HTMLElement>()

const emit = defineEmits(['drag-to']);

const onDrag = (pos: Position, event: PointerEvent) => {
    // console.log("dragging...", pos.x, pos.y)
    emit("drag-to", pos.x);
}

const { x, y, style } = useDraggable(ship, {
  initialValue: { x: 300, y: 300 },
  onMove: onDrag
})



</script>

<style>
#ship {
    width: 100px;
    height: 300px;
    background-color: azure;
    position: fixed;
}

</style>