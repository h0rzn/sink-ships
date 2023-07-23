<template>
<div v-if="!ingame" class="home-fullscreen">
  <div id="items">
    <h1 class="title">Battleships</h1>
    <input id="gameid-input" placeholder="paste game id"/>
    <hr />
    <button class="create-button" disabled>New Game</button>
    <button class="create-button" @click="startGame">Dev button</button>
    
  </div>
  <div class="waves-wrapper">
    <svg
      class="waves"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path
          id="gentle-wave"
          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
        />
      </defs>
      <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(84,58,183,0.9)" />
        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(84,58,183,0.5)" />
        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(84,58,183,0.3)" />
        <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(84,58,183,0.1)" />
      </g>
    </svg>
  </div>
</div>

<div v-else id="game-wrapper" class="home-fullscreen">
  <ShipGame player-name="testPlayerName" game-id="game-id-123"/>
</div>

<!-- https://masscode.io/snippets/ui/effects/2/ -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ShipGame from './ShipGame.vue';

const ingame = ref<boolean>(false);

const startGame = () => {
  ingame.value = true;
}

</script>

<style>
.home-fullscreen {
  width: 100%;
  height: 100%;
}

#items {
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#items hr {
  width: 150px;
  color: #fff;
  margin: 20px 0px;
}

.title {
  color: #fff;
}

#gameid-input {
  border: none;
  border-radius: 10px;
  padding: 12px;
  background-color: #fff;
  margin-bottom: 10px;
  text-align: center;
}
input:focus{
  outline: none;
}

.create-button {
  border: none;
  background-color: #fff;
  border-radius: 10px;
  padding: 12px;
  margin-top: 12px;
  cursor: pointer;
  transition: transform .3s;
}
.create-button:hover {
  transform: scale(1.05);
  background-color: rgba(84,58,183,0.9);
  color: #fff;
}


.waves-wrapper {
width: 100%;
height: 30%;
display: flex;
align-items: flex-end;
overflow: hidden;
}

.waves {
position: relative;
width: 100%;
margin-bottom: -7px; /*Fix for safari gap*/
min-height: 100px;
max-height: 150px;
}
/* Animation */

.parallax > use {
animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
animation-delay: -2s;
animation-duration: 7s;
}
.parallax > use:nth-child(2) {
animation-delay: -3s;
animation-duration: 10s;
}
.parallax > use:nth-child(3) {
animation-delay: -4s;
animation-duration: 13s;
}
.parallax > use:nth-child(4) {
animation-delay: -5s;
animation-duration: 20s;
}
@keyframes move-forever {
0% {
transform: translate3d(-90px, 0, 0);
}
100% {
transform: translate3d(85px, 0, 0);
}
}

</style>