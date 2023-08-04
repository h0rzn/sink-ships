<template>
<div v-if="!ingame" class="home-fullscreen">
  <div id="items">
    <h1 class="title">Battleships</h1>
    <button class="action-button" @click="openSessionWindow('join')">Join Game</button>
    <button class="action-button" @click="openSessionWindow('create')">Create Game</button>
    <StartSession ref="startSessionWin" :type="startType" @submit="onSessionStart"/>
  </div>
  <WavesContainer />
</div>

<div v-else id="game-wrapper" class="home-fullscreen">
  <ShipGame player-name="testPlayerName" game-id="game-id-123"/>
</div>

<!-- https://masscode.io/snippets/ui/effects/2/ -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ShipGame from './game/ShipGame.vue';
import StartSession from './StartSession.vue';
import WavesContainer from './base/WavesContainer.vue';

const ingame = ref<boolean>(true);
const startSessionWin = ref();
const startType = ref<string>("create");

const startGame = () => {
  ingame.value = true;
}

const openSessionWindow = (type: string) => {
  startType.value = type;
  startSessionWin.value.open(type);
}

const onSessionStart = (data: string) => {
  console.log("session start:", data);
  
  // ...

  startGame();
}

</script>

<style>
.home-fullscreen {
  width: 100%;
  height: 100vh;
}

#items {
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  color: #fff;
}

#gameid-input {
  border: none;
  border-radius: 10px;
  padding: 12px 0px;
  width: 170px;
  color: #fff;
  background-color: #303030;
  margin-bottom: 10px;
  text-align: center;
}
input:focus {
  outline: none;
}

.action-button {
  border: none;
  background-color: #303030;
  color: #fff;
  width: 170px;
  border-radius: 10px;
  padding: 12px;
  margin-top: 12px;
  cursor: pointer;
  transition: transform .3s;
}
.action-button:hover {
  background-color: rgba(84,58,183,0.9);
  color: #fff;
}
</style>