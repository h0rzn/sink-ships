<template>
	<div id="timer">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" class="bi bi-clock" viewBox="0 0 16 16">
			<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/> 
			<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/> 
		</svg>
		<p>{{ timeText }}</p>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const timeText = ref<string>("0s");
const timerInterval = ref();

const time = ref<Date>(new Date(1000));

const start = () => {
	timerInterval.value = setInterval(() => {
		time.value.setSeconds(time.value.getSeconds() + 1);
		timeText.value = time.value.toISOString().substring(14, 19)
	}, 1000)
}

const stop = () => {
	clearInterval(timerInterval.value);
}

const reset = () => {
	time.value = new Date(1000);
}

defineExpose({start, stop, reset})

</script>

<style>
#timer {
	height: 25px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}
#timer * {
	padding: 5px;
}
#timer p {
	font-size: 20px;
}

</style>