<template>
	<div id="active-player">
		<div ref="enemy" class="player-box" :class="{ active: active }">
			<p>Enemy</p>
		</div>
		<div ref="player" class="player-box" :class="{ playerActive: !active }">
			<p>You</p>
		</div>
	</div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps({
	active: { type: Boolean, required: true }
})

const enemy = ref();
const player = ref();

</script>

<style>
#active-player {
	width: 300px;
	height: 40px;
	background-color: #303030;
	border-radius: 10px;
	padding: 10px;
	display: flex;
	column-gap: 10px;
	justify-content: space-evenly;
	cursor: default;
}

.active {
	background-color: #242424;
}

.playerActive {
	background-color: rgb(32, 213, 195);
}

.player-box {
	border-radius: 10px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 800;
	transition: background-color 100ms linear;
}
</style>