<template>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">  viewBox="0 0 30 20"
        <rect ref="ship" class="draggable" x="4" y="5" width="8" height="10" fill="#fcba03" />
    </svg> -->

    <div ref="ship" class="box"></div>
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

onMounted(() => {
    ship.value.addEventListener("mousedown", (event: MouseEvent) => {
        offsetX.value = event.clientX - offsetX.value;
        offsetY.value = event.clientY - offsetY.value;
        ship.value.addEventListener("mousemove", move)
    });
    ship.value.addEventListener("mouseup", (event: MouseEvent) => {
        ship.value.removeEventListener("mousedown", move);
    });

    var rect = ship.value.getBoundingClientRect();
    offsetX.value = rect.left;
    offsetY.value = rect.top;
})

const offsetX = ref<number>(200);
const offsetY = ref<number>(200);

const move = (event: MouseEvent) => {
    ship.value.style.left = `${event.clientX - offsetX.value}px`;
    ship.value.style.top = `${event.clientY - offsetY.value}px`;
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