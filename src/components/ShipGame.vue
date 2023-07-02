<template>
    <div v-if="!dataCon">
        <button @click="copyLocalID">copy local-ID</button>
        <input ref="input" value="" @paste="afterpaste"/>
    </div>
    
    <div id="game">
        <FieldMap ref="map" @fired="firedAt"/>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FieldMap from './FieldMap.vue';
import { Peer, DataConnection } from 'peerjs';
import { Ship, Cords, CellState } from '@/GameHelpers';

const localID = ref<string>();
const input = ref<HTMLInputElement>();
const localPeer = ref<Peer>();
const dataCon = ref<DataConnection>();

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
        
        dataCon.value.on("data", (data) => {
            const cords = data as Cords;
            console.log("IN: fire", cords);
            if (isHit(cords.x, cords.y)) {
                console.log("remote shot is hit", cords.x, cords.y);
                map.value.updateCell(cords.x, cords.y, CellState.hit);
            } else {
                console.log("remote shot is miss", cords.x, cords.y)
                map.value.updateCell(cords.x, cords.y, CellState.miss);
            }
        })
    });
})

const copyLocalID = () => {
    if (localID.value) {
        navigator.clipboard.writeText(localID.value);
        console.log("local id copied", localID.value)
    }
}

const afterpaste = () => {
    setTimeout(() => {
        const remoteID: string | undefined = input.value?.value;
        if (remoteID) {
            dataCon.value = localPeer.value?.connect(remoteID);
        }
        console.log("[local] connected to remote", remoteID, dataCon.value);
    }, 500)
}

const firedAt = (x: number, y: number) => {
    console.log("OUT: fire", x, y);
    dataCon.value?.send({x: x, y: y});
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
</style>