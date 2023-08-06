<template>
    <div id="game">

        <div v-if="state === 0">loading...</div>
        
        <div id="status-bar" v-if="state === 2">
            <a id="go-back">&times; back</a>
            <IconTimer ref="timer" />
            <PlayerScores class="score" :enemy="9" :player="5" :max=12 />
        </div>
        <div id="game-body">
            <template v-if="state === 1">
                <ShipInventory />
                <PlaceMap />
            </template>
            <template v-if="state === 2">
                <PlayMap class="map-local" />
                <ActiveIndicator class="active-indicator" />
                <PlayMap class="map-enemy"/>
            </template>
        </div>

        <div v-if="state === 3">
            <p>you won</p>
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Ship, CellState, Move } from '@/GameHelpers';
import IconTimer from '../base/IconTimer.vue';
import PlayerScores from './PlayerScores.vue';
import ShipInventory from './ShipInventory.vue';
import PlaceMap from './map/PlaceMap.vue';
import PlayMap from './map/PlayMap.vue';
import ActiveIndicator from '../ActiveIndicator.vue';

defineProps({
  playerName: { type: String, required: true },
  gameId: { type: String, required: false }
})

// 0 -> loading (prepare, waiting for oponent)
// 1 -> placement phase
// 2 -> playing phase
// 3 -> game ended (win/loss)
const state = ref<number>(2);

const awaitingMove = ref<boolean>(true);

const timer = ref();

const remoteMap = ref();
const localMap = ref();
const ships = ref<Ship[]>([]);

onMounted(() => {
    // remove this
    if (state.value === 0) {
        timer.value.start()
    }
    
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
    width: 90%;
    height: 20vh;
    padding: 15px;
    color: #fff;

    display: grid;
    grid-template-columns: 90% 10%;
    grid-template-rows: 1fr 1fr;
    row-gap: 15px;
}

#go-back {
    cursor: pointer;
    font-size: 20px;
    height: 25px;
}

.score {
    grid-column: 1 / span 2;
    grid-row: 2;
}

#game-body {
    width: 100%;
    display: grid;
    padding: 15px;
    grid-template-columns: auto 100px auto;
    gap: 0;
    grid-auto-flow: row;
    grid-template-areas:
        "map1 ind map2";

}

.map-local {
    grid-area: map1;
    display: flex;
    justify-content: center;
}

.map-enemy {
    grid-area: map2;
    display: flex;
    justify-content: center;
}

.active-indicator { 
    grid-area: ind;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 800px) {
	#game-body {
        grid-template-columns: 100%;
        grid-template-rows: auto 100px auto;
        
        grid-template-areas:
            "map1"
            "ind"
            "map2";
	}

    #indicator-wrapper .arrow-icon {
        transform: rotate(0deg);
    }

}

</style>