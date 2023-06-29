<template>
    <div id="map">
        <div class="cell" v-for="n in mapFields" :key="n">
            <MapCell :key="n" @cell-fired="(e) => yip(e)" :row="createGetRow(n)" :col="createGetCol(n)" />
        </div>
    </div>
    
</template>

<script setup lang="ts">
import MapCell from './MapCell.vue';


//
// PLAYFIELD GENERATION
//
const mapFields = 16

const createGetRow = (index: number): number => {
    index = index - 1;
    return Math.floor(index / 4);
}

const createGetCol = (index: number): number => {
    index = index - 1;
    return index % 4;
}

const yip = (event: MouseEvent) => {
    console.log("yip");
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