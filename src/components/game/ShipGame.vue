<template>
    <div id="game">
        <div id="status-bar">
            <div id="top">
                <div id="go-back">
                    &times; back
                </div>
                <IconTimer ref="timer" id="timer" />
            </div>
            <PlayerScores :enemy="9" :player="5" />
            <ActivePlayer :active="awaitingMove" />
        </div>
        <div id="game-body">
            <FieldMap ref="remoteMap" @fired="handleLocalShot"/>
            <FieldMap ref="localMap" @fired="handleLocalShot"/>
        </div>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FieldMap from './FieldMap.vue';
import { Ship, CellState, Move } from '@/GameHelpers';
import ActivePlayer from '../ActivePlayer.vue';
import IconTimer from '../base/IconTimer.vue';
import PlayerScores from './PlayerScores.vue';

defineProps({
  playerName: { type: String, required: true },
  gameId: { type: String, required: false }
})

const awaitingMove = ref<boolean>(true);

const timer = ref();

const remoteMap = ref();
const localMap = ref();
const ships = ref<Ship[]>([]);

onMounted(() => {
    timer.value.start()
    // let ship1: Ship = {
    //     x: [0, 0],
    //     y: [0, 3],
    // }
    // ships.value?.push(ship1);

    // ships.value.forEach((ship: Ship) => {
    //     for (let r = ship.y[0]; r <= ship.y[1]; r++) {
    //         for (let c = ship.x[0]; c <= ship.x[1]; c++) {
    //             localMap.value.updateCell(c, r, CellState.marked);
    //         }
    //     }
    // })
});

const handleLocalShot = (x: number, y: number) => {
    console.log()
}

const handleMove = (move: Move) => {
    // validate response

    console.log("IN: fire", move.cords);
    if (isHit(move.cords.x, move.cords.y)) {
        console.log("remote shot is hit", move.cords.x, move.cords.y);
        localMap.value.updateCell(move.cords.x, move.cords.y, CellState.hit);
    } else {
        console.log("remote shot is miss", move.cords.x, move.cords.y)
        localMap.value.updateCell(move.cords.x, move.cords.y, CellState.miss);
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
    cursor: default;
}

#status-bar {
    width: 100%;
    height: 35%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    color: #fff;
}

#top {
    width: 90%;
    display: flex;
    justify-content: space-between;

}

#go-back {
    cursor: pointer;
    font-size: 20px;
    height: 25px;
}

#game-body {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
}
</style>