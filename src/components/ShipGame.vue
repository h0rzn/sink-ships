<template>
    <div v-if="!dataCon">
        <button @click="copyLocalID">copy local-ID</button>
        <input ref="input" value="" @paste="afterpaste"/>
    </div>
    <div id="game">
        <p v-if="awaitingMove">Waiting for enemy move</p>
        <p v-else>Its your turn</p>
        <FieldMap ref="map" @fired="shootRemote"/>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FieldMap from './FieldMap.vue';
import { Peer, DataConnection } from 'peerjs';
import { Ship, Cords, CellState, Move } from '@/GameHelpers';

const localID = ref<string>();
const input = ref<HTMLInputElement>();
const localPeer = ref<Peer>();
const dataCon = ref<DataConnection>();

const awaitingMove = ref<boolean>(true);
const lastMove = ref<Move | undefined>();

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

    localPeer.value = new Peer();
    localPeer.value.on('open', (id: string) => {
        localID.value = id;
    });
    localPeer.value.on("connection", (con: DataConnection) => {
        console.log("[remote] connected to local");
        dataCon.value = con;
        awaitingMove.value = false;
        
        dataCon.value.on("data", (data) => {
            console.log("processing remote message");
            const move = data as Move;
            if (move && awaitingMove.value) {
                handleMove(move);
            } else {
                console.log("remote player made illegal move (not his turn)")
            }
        })
    });
});

const validateMoveResponse = (move: Move): boolean => {
    const lastX = lastMove.value?.cords.x;
    const lastY = lastMove.value?.cords.y;
    if (!lastX && !lastY) {
        return false;
    }

    if (!move.cellUpdate) {
        return false;
    }

    return lastX == move.cords.x && lastY == move.cords.y;
}

const handleMove = (move: Move) => {
    if (!validateMoveResponse(move)) {
        console.log("remote move response is not matching local move positions");
        return;
    }

    console.log("IN: fire", move.cords);
    if (isHit(move.cords.x, move.cords.y)) {
        console.log("remote shot is hit", move.cords.x, move.cords.y);
        map.value.updateCell(move.cords.x, move.cords.y, CellState.hit);
    } else {
        console.log("remote shot is miss", move.cords.x, move.cords.y)
        map.value.updateCell(move.cords.x, move.cords.y, CellState.miss);
    }
}

const copyLocalID = () => {
    if (localID.value) {
        navigator.clipboard.writeText(localID.value);
        console.log("local id copied", localID.value);
    }
}

const afterpaste = () => {
    setTimeout(() => {
        const remoteID: string | undefined = input.value?.value;
        if (remoteID) {
            dataCon.value = localPeer.value?.connect(remoteID);
        }
        console.log("[local] connected to remote");
    }, 500)
}

const shootRemote = (x: number, y: number) => {
    if (awaitingMove.value) {
        return;
    }
    console.log("OUT: fire", x, y);
    dataCon.value?.send(123);
    
    const move: Move = {
        // author: localID.value ? localID.value : "player-id-here",
        author: "player",
        cords: {x: x, y: y},
    }
    lastMove.value = move;
    dataCon.value?.send(move);
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
    justify-content: space-evenly;
    align-items: center;
}

#game p {
    color: #fff;
    font-size: 20px;
}
</style>