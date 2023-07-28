<template>

	<div id="active-player">
		<div ref="enemy" id="enemy-box" class="player-box" :class="{ active: active }">
			<p>Enemy</p>
		</div>
		<div ref="player" id="player-box" class="player-box" :class="{ playerActive: active }">
			<p>You</p>
		</div>
	</div>

</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

defineProps({
	active: { type: Boolean, required: true }
})

const enemy = ref();
const player = ref();

</script>

<style>
#active-player {
	width: 200px;
	height: 40px;
	background-color: #535353;
	border-radius: 10px;
	padding: 10px;
	display: flex;
	justify-content: space-evenly;
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
}



</style>