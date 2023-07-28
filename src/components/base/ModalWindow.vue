<template>
	<div id="modal" ref="modal">
		<div class="modal-content">
			<div class="modal-header">
				<span class="close" @click="close">&times;</span>
				<h1>{{ title }}</h1>
			</div>
			<div class="modal-body">
				<slot />
			</div>
		</div>
	</div>
	
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';


const props = defineProps({
	title: { type: String, required: true }
})

const modal = ref();
const closeIcon = ref();

const open = () => {
	console.log("open modal");
	let window = modal.value;
	if (window) {
		window.style.display = "block";
	} 
}

const close = () => {
	console.log("close modal");
	let window = modal.value;
	if (window) {
		window.style.display = "none";
	}
}

onMounted(() => {
	let window = modal.value;
	window.onclick = (event: MouseEvent) => {
		if (event.target == modal.value) {
			modal.value.style.display = "none";
		}
	}
})

defineExpose({
	open
})
</script>

<style>
/* The Modal (background) */
#modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.6); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  margin: auto;
  padding: 0;
  border-radius: 20px;
  width: 600px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}

/* The Close Button */
.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
  transition: transform 0.2s;
}

.close:hover,
.close:focus {
  color: #242424;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: rgba(83, 58, 183, 0.857);
  color: white;
}

.modal-body {
  padding: 2px 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
	background-color: #242424;
	color: #fff;
  padding-bottom: 20px;
}
</style>