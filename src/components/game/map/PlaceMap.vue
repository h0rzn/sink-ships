<template>
	<div id="playmap">
		<BaseMap 
			ref="map" 
			:place-mode="true"
			@events="handleEvents"/>
	</div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseMap from './BaseMap.vue';

const map = ref();

const shipLen = ref(3);


const handleEvents = (event: string, x: number, y: number) => {
	// console.log("placemap event:", event, x, y)
	switch (event) {
		case "mouseover":
			onOver(x, y)
			break;
		default:
			break;
	}
}

const onOver = (x: number, y: number) => {
	map.value.markRange(x, y, shipLen.value)
}
</script>

<style>

</style>