<template>
	<div id="map">
		<MapCell 
			class="cell" 
			v-for="index in 16" 
			:key="index" 
			ref="cellRefs"
			:row="xByIdx(index)"
			:col="yByIdx(index)"
			:state="0"
			@click="onClick"
			@mouseover="onMouseOver"
			@mouseleave="onMouseLeave"
		/>

	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MapCell from './MapCell.vue';

const size = 16;
const rowCount = 4;

const emit = defineEmits(["events"])

const cellRefs = ref<typeof MapCell[]>([]);

const xByIdx = (idx: number) => {
	return Math.floor((idx - 1) / size);
}

const yByIdx = (idx: number) => {
	return (idx - 1)  % size;
}

const onClick = (x : number, y: number) => {
	emit("events", "click", x, y);

	let idx = (x * rowCount) + y;
	if (idx >= 0 && idx < size) {
		if (cellRefs.value) {
			cellRefs.value[idx]?.updateStyle(3);
		}
	}
}

const onMouseLeave = (x: number, y: number) => {
	// console.log("leave")

	emit("events", "mouseleave", x, y);
}

const onMouseOver = (x: number, y: number) => {
	console.log("over", x, y)

	emit("events", "mouseover", x, y);
}
</script>

<style>
#map {
    height: 400px;
    width: 400px;
    display: grid; 
    grid-template-rows: 25% 25% 25% 25%;
    grid-template-columns: 25% 25% 25% 25%;
    background-color: #303030;
    border-radius: 10%;
}

.cell {
    width: 100px;
    height: 100px;
}
</style>