<template>

    <div id="inventory">
        <div id="ship-storage">
            <ShipItem />
        </div>

    </div>

</template>

<script setup lang="ts">
import ShipItem from './ShipItem.vue';

</script>

<style>
#inventory {
    width: 400px;
    height: 400px;
    border: 1px solid black;
    border: 1px solid #fff;
    border-radius: 10%;
}

#ship-storage {
    width: 100%;
    height: 100%;
}


</style>