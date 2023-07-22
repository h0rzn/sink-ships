import { Ref } from 'vue';

export type Cords = {
	x: number;
	y: number;
}

export type Ship = {
	x: [number, number];
	y: [number, number];
}

export enum CellState {
	raw,
	miss,
	hit,
	marked
}

export type Cell = {
	x: number,
	y: number;
	// 0 -> untouched
	// 1 -> miss
	// 2 -> hit
	// 3 -> mark (testing)
	state: CellState;
	item: Ref;
}

export type Move = {
	author: string;
	cords: Cords;
	cellUpdate?: CellState;
}


export enum MessageTypes {
	// + some sort of handshaking (starting player, ...)
	shoot,
	shotResponse
}

export type Message = {
	author: string;
	type: string;
	data: any;
}
