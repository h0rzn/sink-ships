<template>

    <div id="inventory">
        <div id="ship-storage">
            <ShipItem ref="ship" @drag-to="(x) => handleShipMove(x)"/>
            <!-- <OldShipItem /> -->
        </div>

    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import ShipItem from './ShipItem.vue';
// import OldShipItem from './OldShipItem.vue';

const ship = ref<HTMLElement>();

const handleShipMove = (x: number) => {
    console.log("ship is moving", x);
}
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