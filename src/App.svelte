<script lang="ts">
  import Well from "./Well.svelte";
  import { Direction, type State } from "./lib/state";
  import { empty_state, offset } from "./lib/state";
  import { new_state, rotate_state, offset_state } from "./lib/move";
  import display_well from "./lib/well";

  let history: State[] = [empty_state()];
  $: state = history.at(-1);
  $: well = display_well(state);

  const reset = () => {
    history = [empty_state()];
  };
  const undo = () => {
    if (history.length > 1) {
      history = history.slice(0, -1);
    }
  };
  const move = (direction: Direction) => {
    const result = offset_state(state, offset[direction]);
    if (result != state) {
      history = [...history, result];
    } else if (direction == Direction.Down && result.piece != null) {
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
  <div class="game">
    <div class="main">
      <div class="well"><Well {well} /></div>
      <div class="about">
        <div class="text">Score: {state.score}</div>
        <div class="text">
          Controls:
          <br />A: Move Left
          <br />S: Move Down
          <br />D: Move Right
          <br />K: Rotate CCW
          <br />L: Rotate CW
          <br />;: Rotate Twice
        </div>
        <div class="space" />
        <div class="text">
          <a href="https://github.com/tb148/tetris-legacy">Source Code</a>
        </div>
        <div class="text">
          Inspired by <a href="https://qntm.org/hatetris">Hatetris</a>.
        </div>
      </div>
    </div>
    <div class="buttons">
      <button on:click={reset}>Reset</button>
      <button on:click={undo} disabled={history.length == 1}>Undo</button>
    </div>
  </div>
</template>

<style lang="scss">
  .game {
    display: flex;
    flex-flow: column;
    gap: 1em;
    max-width: 100vw;
    width: 20em;
    .main {
      display: flex;
      flex: none;
      flex-flow: row;
      gap: 1em;

      .well {
        flex: none;
      }

      .about {
        display: flex;
        flex: auto;
        flex-flow: column;
        .text {
          flex: none;
          margin-bottom: 1em;
        }
        .text:last-child {
          margin-bottom: 0;
        }
        .space {
          flex: auto;
        }
      }
    }
    .buttons {
      display: flex;
      gap: 1em;
      button {
        background-color: blue;
        border: 0;
        color: white;
        height: 3em;
        width: 100%;
      }
      button:hover {
        background-color: #009;
      }
      button:active {
        background-color: red;
      }
      button[disabled] {
        background-color: #999;
        cursor: default;
      }
      :focus {
        outline: 2px solid black;
      }
    }
  }
</style>
