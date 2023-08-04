<template>
	<div id="indicator-wrapper">
		<div ref="arrow" @click="toggle" class="arrow-icon" :class="{ open : open }">
			<span class="left-bar"></span>
			<span class="right-bar"></span>
		</div>
	</div>
	
</template>

<script setup lang="ts">
import { ref } from 'vue';

const arrow = ref();
const open = ref();

const toggle = () => {
	open.value = !open.value;
}

defineExpose({toggle})

</script>

<style scoped>
#indicator-wrapper {
	height: 400px;
}

.arrow-icon {
	height: 2.8em;
	width: 2.8em;
	display: block;
	padding: 0.5em;
	margin: 1em auto;
	position: relative;
	cursor: pointer;
	border-radius: 4px;
	transform: rotate(90deg);
}

.left-bar {
	position: absolute;
	background-color: transparent;
	top: 0;
	left: 0;
	width: 40px;
	height: 10px;
	display: block;
	transform: rotate(35deg);
	float: right;
	border-radius: 2px;
}

.left-bar:after {
	content: "";
	background-color: white;
	width: 40px;
	height: 10px;
	display: block;
	float: right;
	border-radius: 6px 10px 10px 6px;
	transition: all 0.5s cubic-bezier(0.25, 1.7, 0.35, 0.8);
	z-index: -1;
}

.right-bar {
	position: absolute;
	background-color: transparent;
	top: 0px;
	left: 26px;
	width: 40px;
	height: 10px;
	display: block;
	transform: rotate(-35deg);
	float: right;
	border-radius: 2px;
}

.right-bar:after {
	content: "";
	background-color: white;
	width: 40px;
	height: 10px;
	display: block;
	float: right;
	border-radius: 10px 6px 6px 10px;
	transition: all 0.5s cubic-bezier(0.25, 1.7, 0.35, 0.8);
	z-index: -1;
}

.open .left-bar:after {
	transform-origin: center center;
	transform: rotate(-70deg);
}

.open .right-bar:after {
	transform-origin: center center;
	transform: rotate(70deg);
}</style>