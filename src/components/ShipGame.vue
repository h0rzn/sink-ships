<template>
    <div id="game">
        <FieldMap />
        
    </div>
</template>

<script setup lang="ts">
import FieldMap from './FieldMap.vue';

</script>

<style>
#game {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
</style>