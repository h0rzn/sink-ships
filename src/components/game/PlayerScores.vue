<template>
	<div id="scores">
		<div class="sec-left">
			<div class="bar-enemy" :style="{ width: enemyWidth }"/>
			<p class="hit-counter">{{ props.enemy }} hits</p>
		</div>
		<div class="sec-right">
			<div class="bar-player" :style="{ width: playerWidth }"/>
			<p class="hit-counter">{{ props.player }} hits</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
	enemy: { type: Number, required: true },
	player: { type: Number, required: true },
	max: { type: Number, required: true}
})

const enemyWidth = computed(() => {
	return Math.round(props.enemy / props.max * 100) + "%"
})

const playerWidth = computed(() => {
	return Math.round(props.player / props.max * 100) + "%"
})
</script>

<style>
#scores {
	/* width: 450px; */
	width: 100%;
	height: 8px;
	background-color: #303030;
	border-radius: 10px;
	display: flex;
	justify-content: center;
}

.sec-left {
	width: 50%;
	display: flex;
	justify-content: flex-end;
	flex-wrap: wrap;
}
.sec-right {
	width: 50%;
}

.bar-enemy {
	height: 100%;
	border-radius: 10px 0px 0px 10px;
	background-color: #FF4A4A;
	flex-basis: 100%;
	
}

.bar-player {
	height: 100%;
	border-radius: 0 10px 10px 0;
	background-color: #00FFA3;
}

.hit-counter {
	padding: 0 10px;
}
</style>