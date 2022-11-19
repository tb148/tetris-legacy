import type { State } from "./well";
import { piece_position } from "./well";

export default (state: State) => {
	const result: string[][] = state.well
		.slice(0, 20)
		.map((flat) => flat.map((tile) => (tile ? "dead" : "empty")));
	if (state.piece == null) {
		result.reverse();
		return result;
	}
	const position = piece_position(state.piece);
	position.forEach((coord) => (result[coord[0]][coord[1]] = "alive"));
	result.reverse();
	return result;
};
