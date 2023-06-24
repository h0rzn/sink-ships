<template>
    <svg ref="ship" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20">
        <rect class="draggable" x="4" y="5" width="8" height="10" fill="#007bff"/>
    </svg>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const ship = ref();

onMounted(() => {
    let svg = ship.value as HTMLElement;

    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);

})

const startDrag = () => {
    console.log("start drag");
}
const drag = () => {
    console.log("drag")
    // if (selectedElement) {
    // evt.preventDefault();
    // var x = parseFloat(selectedElement.getAttributeNS(null, "x"));
    // selectedElement.setAttributeNS(null, "x", x + 0.1);
        parseFloat
    let svg = ship.value as HTMLElement;
    let x = svg.getAttributeNS(null, "x")
    if (x === null) {
        return;
    }
    let newX = x + 0.1
    svg.setAttributeNS(null, "x", newX.toString())
}
const endDrag = () => {
    console.log("end drag")
}

</script>

<style>
.draggable {
    cursor: move;
}
</style>