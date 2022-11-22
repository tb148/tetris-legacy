<script lang="ts">
	import type { State } from "./lib/state";
	import display_well from "./lib/well";
	export let state: State;
	$: well = display_well(state);
</script>

<template>
	<div class="tiles">
		{#each well as flat, i}
			{#each flat as tile, j}
				<div class="tile tile-{tile} tile-flat{i} tile-col{j}" />
			{/each}
		{/each}
	</div>
</template>

<style lang="scss">
	.tiles {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		grid-template-rows: repeat(20, 1fr);

		.tile {
			width: 1.2em;
			height: 1.2em;
			padding: 0;
		}

		.tile-empty {
			background-color: black;
		}
		.tile-empty:hover {
			background-color: #333;
		}

		.tile-alive {
			background-color: red;
		}
		.tile-alive:hover {
			background-color: #f33;
		}

		.tile-dead {
			background-color: blue;
		}
		.tile-dead:hover {
			background-color: #33f;
		}

		.tile-flat15 {
			border-top: 1px solid red;
		}

		@for $i from 0 to 20 {
			.tile-flat#{$i} {
				grid-row: 20 - $i;
			}
		}
	}
</style>
