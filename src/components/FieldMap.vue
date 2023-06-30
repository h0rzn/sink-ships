<template>
    <div id="map">
        <div class="cell" v-for="(cell, index) in cells" :key="index">
            <MapCell :key="index" :ref="cell.item" @cell-fired="cellFired" :row="cell.x" :col="cell.y" :state="cell.state"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref, defineEmits, defineExpose } from 'vue';
import MapCell from './MapCell.vue';

defineExpose({
    test
})

const size = 16;
type Cell = {
    x: number,
    y: number;
    // 0 -> untouched
    // 1 -> miss
    // 2 -> hit
    state: number;
    item: Ref;
}

const cells = ref<Cell[]>([]);
const emit = defineEmits(["fired"])

onMounted(() => {
    // populate cells
    const dim: number = Math.sqrt(size)
    for (let i = 0; i < size; i++) {
        const x = Math.floor(i / dim);
        const y = i % dim;
        let cell = {
            x: x,
            y: y,
            state: 0,
            item: ref(x.toString() + y.toString())
        }
        cells.value.push(cell);
    }
})

const cellFired = (x: number, y: number) => {
    let cell = getCell(x, y);
    if (cell) {
        console.log("cell identified, state:", cell.state);
        if (cell.state == 0) {
            cell.state = (Math.random() > 0.5 ? 1 : 2);
            emit("fired", x, y);
        }
    }
}

const getCell = (x: number, y: number): Cell | undefined => {
    return cells.value.find((cell: Cell) => cell.x == x && cell.y == y);
}

function test() {
    console.log("test")
}
</script>

<style>
#map {
    height: 400px;
    width: 400px;
    display: grid; 
    grid-template-rows: 25% 25% 25% 25%;
    grid-template-columns: 25% 25% 25% 25%;
    border: 1px solid #fff;
    border-radius: 10%;
}

.cell {
    width: 100px;
    height: 100px;
}

</style>