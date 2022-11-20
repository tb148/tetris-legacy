import type { State } from "./state";
import { piece_position } from "./state";

export default (state: State) => {
	const result: string[][] = state.well.map((flat) =>
		flat.map((tile) => (tile ? "dead" : "empty"))
	);
	if (state.piece == null) {
		return result.slice(0, 20).reverse();
	}
	const position = piece_position(state.piece);
	position.forEach((coord) => (result[coord[0]][coord[1]] = "alive"));
	return result.slice(0, 20).reverse();
};
