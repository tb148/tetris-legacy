<script lang="ts">
	import { Direction, type State } from "./lib/state";
	import display_well from "./lib/well";
	import { empty_state, offset } from "./lib/state";
	import { new_state, rotate_state, offset_state } from "./lib/move";

	let history: State[] = [empty_state()];
	$: state = history.at(-1);
	$: well = display_well(state);

	const reset = () => {
		history = [empty_state()];
	};
	const move = (direction: Direction) => {
		const result = offset_state(state, offset[direction]);
		if (result != state) {
			history = [...history, result];
		} else if (direction == Direction.Down) {
			history = [...history, new_state(state)];
		}
	};
	const rotate = (direction: Direction) => {
		const result = rotate_state(state, direction);
		if (result != state) {
			history = [...history, result];
		}
	};
	const key_press = (event: KeyboardEvent) => {
		if (event.code == "KeyA") {
			move(Direction.Left);
		}
		if (event.code == "KeyS") {
			move(Direction.Down);
		}
		if (event.code == "KeyD") {
			move(Direction.Right);
		}
		if (event.code == "KeyK") {
			rotate(Direction.Left);
		}
		if (event.code == "KeyL") {
			rotate(Direction.Right);
		}
		if (event.code == "Semicolon") {
			rotate(Direction.Down);
		}
	};
</script>

<svelte:window on:keydown={key_press} />
<template>
	Score: {state.score}
	<main>
		{#each well as flat, i}
			{#each flat as tile, j}
				<div class="tile tile-{tile} tile-flat{i} tile-col{j}" />
			{/each}
		{/each}
	</main>

	<button on:click={reset}>Reset</button>
</template>

<style lang="scss">
	main {
		max-width: 200px;
		min-height: 400px;
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		grid-template-rows: repeat(20, 1fr);

		.tile {
			width: 100%;
			height: 100%;
		}

		.tile-empty {
			background-color: black;
		}

		.tile-alive {
			background-color: red;
		}

		.tile-dead {
			background-color: blue;
		}

		.tile-flat4 {
			border-top: 1px solid red;
		}
	}
</style>
