<template>

    <div id="harbor">
        <div id="inventory">
            <ShipItem />
        </div>

    </div>

</template>

<script setup lang="ts">
import ShipItem from './ShipItem.vue';

</script>

<style>
#harbor {
    width: 400px;
    height: 400px;
    border: 1px solid black;
}

#inventory {
    width: 100%;
    height: 100%;
}


</style>