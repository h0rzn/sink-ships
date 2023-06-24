<template>
    <div id="map">
        <div class="cell" v-for="n in 16" :key="n">
            <MapCell :key="n" @cell-fired="() => {}" :x="n" :y=0 />
        </div>
    </div>
    
</template>

<script setup lang="ts">
import MapCell from './MapCell.vue';
// css grid: https://kulturbanause.de/blog/css-grid-layout-module/

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
