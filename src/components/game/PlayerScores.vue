<template>
	<div id="scores">
		<div class="bar-left">
			<div class="bar-enemy" :style="{ width: enemyWidth }"/>
		</div>
		<div class="bar-right">
			<div class="bar-player" :style="{ width: playerWidth }"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
	enemy: { type: Number, required: true },
	player: { type: Number, required: true }
})

const maxPoints = 12;

const enemyWidth = computed(() => {
	return Math.round(props.enemy / maxPoints * 100) + "%"
})

const playerWidth = computed(() => {
	return Math.round(props.player / maxPoints * 100) + "%"
})
</script>

<style>
#scores {
	width: 450px;
	height: 20px;
	background-color: #303030;
	border-radius: 10px;
	display: flex;
	justify-content: center;
}

.bar-left {
	width: 50%;
	display: flex;
	justify-content: flex-end;
}
.bar-right {
	width: 50%;
}

.bar-enemy {
	height: 20px;
	border-radius: 10px 0px 0px 10px;
	background-color: #FF4A4A;
	
}

.bar-player {
	height: 20px;
	border-radius: 0 10px 10px 0;
	background-color: #00FFA3;
}
</style>