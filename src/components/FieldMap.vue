<template>
    <div id="map">
        <div class="cell" v-for="(cell, index) in cells" :key="index">
            <MapCell :key="index" @cell-fired="cellFired" :row="cell.x" :col="cell.y" />
        </div>
    </div>
    
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import MapCell from './MapCell.vue';

const mapFields = 16;

type Cell = {
    x: number,
    y: number;
}

const cells = ref<Cell[]>([]);

onMounted(() => {
    // populate cells
    for (let i = 0; i < mapFields; i++) {
        let cell = {
            x: Math.floor(i / 4),
            y: i % 4
        }
        cells.value.push(cell);
    }

})

const cellFired = (x: number, y: number) => {
    console.log("fired", x, y)
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