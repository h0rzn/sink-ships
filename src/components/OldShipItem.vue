<template>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">  viewBox="0 0 30 20"
        <rect ref="ship" class="draggable" x="4" y="5" width="8" height="10" fill="#fcba03" />
    </svg> -->

    <div ref="ship" class="box" draggable="true"></div>
</template>

<script setup lang="ts">
// https://dev.to/abolz/roll-your-own-svg-drag-and-drop-in-vuejs-2c7o
import { onMounted, ref } from 'vue';

const ship = ref();
const dragActive = ref<boolean>(false);
// const mouseOffset = ref();

// onMounted(() => {
//     ship.value.addEventListener('mousedown', startDrag);
//     ship.value.addEventListener('mousemove', drag);
//     ship.value.addEventListener('mouseup', endDrag);
//     ship.value.addEventListener('mouseleave', endDrag);

// })

// const startDrag = (event: MouseEvent) => {
//     console.log("start drag", ship.value.getAttributeNS(null, "x"), ship.value.getAttributeNS(null, "y"));
//     const currentOffset = getMousePos(event);
//     currentOffset.x -= parseFloat(ship.value.getAttributeNS(null, "x"));
//     currentOffset.y -= parseFloat(ship.value.getAttributeNS(null, "y"));
//     mouseOffset.value = currentOffset;
//     dragActive.value = true;
// }

// const drag = (event: MouseEvent) => {
//     event.preventDefault();
//     if (dragActive.value) {
//         console.log("dragging");
//         const mousePos = getMousePos(event);

//         ship.value.setAttributeNS(null, "x", mousePos.x - mouseOffset.value.x);
//         ship.value.setAttributeNS(null, "y", mousePos.y - mouseOffset.value.y);
//     }
// }

// const endDrag = () => {
//     console.log("end drag", ship.value.getAttributeNS(null, "x"), ship.value.getAttributeNS(null, "y"));
//     dragActive.value = false;
// }



// const getMousePos = (evt: MouseEvent) => {
//     let CTM = ship.value.getScreenCTM();
//     return {
//         x: (evt.clientX - CTM.e) / CTM.a,
//         y: (evt.clientY - CTM.f) / CTM.d
//     };
// }

const offsetX = ref<number>(0);
const offsetY = ref<number>(0);

const originalOffsetX = ref<number>(0);
const originalOffsetY = ref<number>(0);

onMounted(() => {
    ship.value.addEventListener("drag", move);
    ship.value.addEventListener("dragstart", dragStart);
    ship.value.addEventListener("dragend", dragEnd);

    var rect = ship.value.getBoundingClientRect();
    offsetX.value, originalOffsetX.value = rect.left;
    offsetY.value, originalOffsetY.value = rect.top;
    console.log(offsetX.value, offsetY.value);
})

const dragStart = (event: DragEvent) => {
    console.log("dragstart")
    offsetX.value = event.clientX - offsetX.value;
    offsetY.value = event.clientY - offsetY.value;
}

const dragEnd = (event: DragEvent) => {
    event.preventDefault();
    // event.stopPropagation();
    // ship.value.removeEventListener("dragend", move);
    // ship.value.removeEventListener("dragstart", dragStart);
    console.log("dragend", event.clientX, event.clientY);

}



const move = (event: DragEvent) => {
    ship.value.style.left = `${event.screenX - offsetX.value}px`;
    ship.value.style.top = `${event.screenY - offsetY.value}px`;

    console.log(event);

    // ship.value.style.left = event.clientX + "px";
    // ship.value.style.top = event.clientY + "px";
    console.log("move", event.clientX, event.clientY, ship.value.style.left, ship.value.style.top);
}



</script>

<style>
.draggable {
    cursor: pointer;
    border: 1px solid blue;
    z-index: 1;
}
.box {
    width: 100px;
    height: 100px;
    background-color: aquamarine;
    position: absolute;
}
</style>