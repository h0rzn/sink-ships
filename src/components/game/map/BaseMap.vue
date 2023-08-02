<template>
	<div id="map">
		<template v-for="(row, r) in states" :key="r">
			<AltCell
				v-for="(cell, c) in row" 
				:key="cell.toString()+'_'+r.toString()" 
				:row="r"
				:col="c"
				:state="cell"
				@cell-click="onClick"
				@cell-hover="onMouseOver"
				@cell-hover-leave="onMouseLeave"
			/> 
		</template>
	</div>
	<button @click="markMode = !markMode; console.log('toggled markmode')">toggle marking</button>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AltCell from './AltCell.vue';

const props = defineProps({
	placeMode: { type: Boolean }
})
const emit = defineEmits(["events"])

const size = 144;
const rowCount = 12;

const states = ref<number[][]>([]);
const markMode = ref(false);

type cords = [number, number];
const marks = ref<cords[]>();

onMounted(() => {
	for (let row = 0; row < 12; row++) {
		let r: number[] = [];
		for (let col = 0; col < 12; col++) {
			r.push(0)
		}
		states.value.push(r);
	}

})

const onClick = (x : number, y: number) => {
	console.log("on click base map", x, y, states.value[x][y])
	emit("events", "click", x, y);

	// let idx = idxByCords(x, y);
	// if (idx >= 0 && idx < size) {
	// 	if (cellRefs.value) {
	// 		// cellRefs.value[idx]?.updateStyle(3);
	// 		cellRefs.value[idx]?.mark();
	// 	}
	// }
	// states.value[x][y] = 1;

}

const onMouseLeave = (x: number, y: number) => {
	// console.log("leave")

	emit("events", "mouseleave", x, y);
}

const onMouseOver = (x: number, y: number) => {
	emit("events", "mouseover", x, y);
}

const markRange = (x1: number, y1: number, len: number) => {
	const inRange = x1 >= 0 && 
		x1 <= rowCount &&
		y1 >= 0 &&
		y1 <= rowCount
	
	if (!inRange) {
		return;
	}

	console.log("marking")


	for (let n = y1; n <y1+len; n++) {
		// test.value[x1][n] = 1;

		let a = states.value.at(x1);
		let b = a?.at(n)
		if (a && b) {
			console.log("mark", x1, n);

			// marks.value.push([x1, b]);
			states.value[x1][b] = 1;
		}
	}
}



defineExpose({markRange})

</script>

<style>
#map {
    height: 400px;
    width: 400px;
    display: grid; 
	row-gap: 8px;
	column-gap: 8px;
	grid-template-rows: repeat(12, 1fr);;
	grid-template-columns: repeat(12, 1fr);

}
</style>