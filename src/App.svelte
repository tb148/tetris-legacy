<script lang="ts">
	import type { State } from "./lib/well";
	import display_game from "./lib/game";
	import { empty_state } from "./lib/well";
	import { new_state, valid_offset_state } from "./lib/move";

	let history: State[] = [empty_state()];
	$: state = history.at(-1);
	$: game = display_game(state);

	const reset = () => {
		history = [empty_state()];
	};
	const move_down = () => {
		const result = valid_offset_state(state, [-1, 0]);
		if (result == state) {
			history = [...history, new_state(state)];
		} else {
			history = [...history, result];
		}
	};
</script>

<template>
	<main>
		{#each game as flat, i}
			{#each flat as tile, j}
				<div class="tile tile-{tile} tile-flat{i} tile-col{j}" />
			{/each}
		{/each}
	</main>

	<button on:click={reset}>Reset</button>
	<button on:click={move_down}>Down</button>
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
			background-color: yellow;
		}

		.tile-dead {
			background-color: blue;
		}
	}
</style>
