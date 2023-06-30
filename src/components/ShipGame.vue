<template>
    <div v-if="!dataCon">
        <button @click="btnClick">connect</button>
        <input ref="input" value=""/>
        <p style="color: #fff">{{ localID }}</p>
    </div>
    
    <div id="game">
        <FieldMap ref="map" @fired="firedAt"/>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import FieldMap from './FieldMap.vue';
import { Peer, DataConnection } from 'peerjs';

const localID = ref<string>();
const input = ref<HTMLInputElement>();
const localPeer = ref<Peer>();
const dataCon = ref<DataConnection>();

const map = ref();

onMounted(() => {
    localPeer.value = new Peer();
    localPeer.value.on('open', (id: string) => {
        console.log('peer id: ' + id);
        localID.value = id;
    });
    localPeer.value.on("connection", (con: DataConnection) => {
        console.log("on connection", con);
        dataCon.value = con;
        dataCon.value.on("data", (data) => {
            console.log("data", data);
        })
    });
})

const btnClick = (event: MouseEvent) => {
    console.log("btn click");
    const remoteID: string | undefined = input.value?.value;
    if (remoteID) {
        dataCon.value = localPeer.value?.connect(remoteID);
    }
    console.log("data-con after remote connect", dataCon.value);
}

const firedAt = (x: number, y: number) => {
    console.log("GAME: ", x, y);
    dataCon.value?.send({x: x, y: y})
    map.value.test();
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