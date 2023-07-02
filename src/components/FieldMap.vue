<template>
    <div id="map">
        <div class="cell" v-for="(cell, index) in cells" :key="index">
            <MapCell :key="index" :ref="cell.item" @cell-fired="cellFired" :row="cell.x" :col="cell.y" :state="cell.state"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, defineExpose } from 'vue';
import MapCell from './MapCell.vue';
import { Cell, CellState } from '../GameHelpers';

defineExpose({
    updateCell
})

const size = 16;

const cells = ref<Cell[]>([]);
const emit = defineEmits(["fired"])

onMounted(() => {
    // populate cells
    const dim: number = Math.sqrt(size)
    for (let i = 0; i < size; i++) {
        const x = Math.floor(i / dim);
        const y = i % dim;
        let cell: Cell = {
            x: x,
            y: y,
            state: CellState.raw,
            item: ref(x.toString() + y.toString())
        }
        cells.value.push(cell);
    }
})

const cellFired = (x: number, y: number) => {
    let cell = getCell(x, y);
    if (cell) {
        if (cell.state == CellState.raw || cell.state == CellState.marked) {
            emit("fired", x, y);
        }
    }
}

const getCell = (x: number, y: number): Cell | undefined => {
    return cells.value.find((cell: Cell) => cell.x == x && cell.y == y);
}

function updateCell(x: number, y: number, state: number) {
    let cell = getCell(x, y);
    if (cell) { // TODO check state 
        cell.state = state;
    }
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