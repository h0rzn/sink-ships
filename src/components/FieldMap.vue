<template>
    <div id="map">
        <div class="cell" v-for="n in mapFields" :key="n">
            <MapCell :key="n" @cell-fired="() => {}" :row="createGetRow(n)" :col="createGetCol(n)" />
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
</script>

<style>
#map {
    height: 400px;
    width: 400px;
    background-color: blue;

    display: grid; 
    /* grid-template-rows: 200px 1fr 100px;  */
    grid-template-rows: 25% 25% 25% 25%;
    grid-template-columns: 25% 25% 25% 25%; 
}

.cell {
    width: 100px;
    height: 100px;
}

</style>