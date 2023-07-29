<template>
	<ModalWindow ref="modal" :title="getTitle()">

		<div v-if="type === 'join'">
			<input placeholder="game id" />
			<input placeholder="username" />
			<button class="action-button">join</button>
		</div>

		<div v-else>
			<input placeholder="game name" />
			<input placeholder="username" />
			<button class="action-button">create</button>
		</div>
		
	</ModalWindow>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModalWindow from './base/ModalWindow.vue';

const props = defineProps({
	type: { type: String, required: true }
})

const modal = ref();
const startType = ref<string>();

const open = (type: string) => {
	startType.value = type;
	console.log("open start session", startType.value)
	modal.value.open();
}


const getTitle = (): string => {
	return props.type.charAt(0).toUpperCase() + props.type.slice(1) + " Game";
}

defineExpose({open})

</script>

<style>
input {
	background-color: #303030;
	border: none;
	border-radius: 10px;
	color: #fff;
	padding: 10px;
	margin: 5px;
}
</style>