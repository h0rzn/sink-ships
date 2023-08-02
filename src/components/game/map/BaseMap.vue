<template>
	<!-- Detecting mouse events -->
	<div id="map" ref="mapRef" @mousemove="(event) => hoverMove(event)" @mouseleave="(event) => hoverLeave(event)" @mouseenter="(event) => hoverEnter(event)">
		<!-- Extra Container to hide gradient overflow -->
		<div class="mapContainer">
			<!-- The gradient -->
			<div class="hover-effect" ref="hoverRef"></div>
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

const mapRef = ref();
const hoverRef = ref();

var mousein = false;

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

//Detect leave event to blend out gradient
const hoverLeave = (event: Event) => {
	console.log("Leave");
	mousein = false;
	console.log("LEAVE")
	hoverRef.value.style.opacity = "0%";
}

//Detect enter event to blend in gradient
const hoverEnter = (event: Event) => {
	console.log("Enter");
	mousein = true;
	hoverRef.value.style.opacity = "100%";
}

//Move event to make gradient follow mouse
const hoverMove = (event: MouseEvent) => {
	console.log("move")
	if(event.clientX > mapRef.value.getBoundingClientRect().left && event.clientX < mapRef.value.getBoundingClientRect().right){
		if(mousein == false){
			console.log("ENTER")
		}
		let x = event.clientX;
		let y = event.clientY;

		let mapX = mapRef.value.getBoundingClientRect().left;
		let mapY = mapRef.value.getBoundingClientRect().top;

		let hoverSize = hoverRef.value.offsetHeight / 2;

		hoverRef.value.style.transform =
      "translate(" +
      (x - mapX - hoverSize) +
      "px," +
      (y - mapY - hoverSize) +
      "px)";
	} 

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
	background: #303030;
}

.mapContainer {
	height: 400px;
    width: 400px;
	position: relative;
	overflow: hidden;
	display: grid; 
	row-gap: 8px;
	column-gap: 8px;
	grid-template-rows: repeat(12, 1fr);;
	grid-template-columns: repeat(12, 1fr);
	grid-gap: 0px;

}

.hover-effect {
  opacity: 0%;
  height: 100px;
  width: 100px;
  position: absolute;
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    rgba(165, 165, 165, 0.7) 0%,
    rgba(255, 255, 255, 0) 75%
  );
  transform-origin: center;
}
</style>