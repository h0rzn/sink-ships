<template>
    <div id="game">
        <div id="status-bar">
            <p id="timer">Game time: 04:47</p>
            <ActivePlayer :active="awaitingMove"/>
        </div>
        <div id="game-body">
            <FieldMap ref="map" @fired="handleLocalShot"/>
        </div>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FieldMap from './FieldMap.vue';
import { Ship, Cords, CellState, Move } from '@/GameHelpers';
import ActivePlayer from './ActivePlayer.vue';

const props = defineProps({
  playerName: { type: String, required: true },
  gameId: { type: String, required: false }
})

const awaitingMove = ref<boolean>(true);

const map = ref();
const ships = ref<Ship[]>([]);

onMounted(() => {
    let ship1: Ship = {
        x: [0, 0],
        y: [0, 3],
    }
    ships.value?.push(ship1);

    ships.value.forEach((ship: Ship) => {
        for (let r = ship.y[0]; r <= ship.y[1]; r++) {
            for (let c = ship.x[0]; c <= ship.x[1]; c++) {
                map.value.updateCell(c, r, CellState.marked);
            }
        }
    })
});

const handleLocalShot = (x: number, y: number) => {
    console.log()
}

const handleMove = (move: Move) => {
    // validate response

    console.log("IN: fire", move.cords);
    if (isHit(move.cords.x, move.cords.y)) {
        console.log("remote shot is hit", move.cords.x, move.cords.y);
        map.value.updateCell(move.cords.x, move.cords.y, CellState.hit);
    } else {
        console.log("remote shot is miss", move.cords.x, move.cords.y)
        map.value.updateCell(move.cords.x, move.cords.y, CellState.miss);
    }
}

const isHit = (x: number, y: number): boolean => {
    let hit = false;
    ships.value?.forEach((ship: Ship) => {
        if (onShip(ship, x, y)) {
            hit = true;
            return;
        }
    })
    return hit;
}

const onShip = (ship: Ship, x: number, y: number): boolean => {
    return x >= ship.x[0] && x <= ship.x[1] && y >= ship.y[0] && y <= ship.y[1];
}

</script>

<style>
#game {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

#game p {
    color: #fff;
}

#status-bar {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

#timer {
    font-size: 25px;
}


#game-body {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>