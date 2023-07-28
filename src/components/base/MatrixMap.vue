<template>
	<svg ref="test"></svg>
</template>

<script setup lang="ts">
import { Ref, ref, onMounted, defineProps } from 'vue';

type Cell = {
	x: number;
	y: number;
	item: Ref;
};

const props = defineProps({
	rows: { type: Number, required: true },
	columns: { type: Number, required: true }
});

const cells = ref<Cell[][]>();

onMounted(() => {
    // populate cells
	const dim: number = props.rows * props.columns

	for (let r = 0; r < props.rows; r++) {
		let row = [] as Cell[];
		for (let c = 0; c < props.columns; c++) {
			let cell: Cell = {
				x: r,
				y: c,
				item: ref()
			}
			row.push(cell);
		}
		cells.value?.push(row);
	}
})

const getCell = (x: number, y: number): Cell | undefined => {
	if (cells.value) {
		return cells.value[x][y]
	}
}

const setFg = (x: number, y: number, fgHex: string) => {
	let cell = getCell(x, y)
	if (cell) {
	}
}

const setBg = (x: number, y: number, fgHex: string) => {
	let cell = getCell(x, y)
	if (cell) {
	}
}
</script>

<style>

</style>