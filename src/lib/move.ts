import { type State, type Piece, Direction } from "./state";
import { piece_position, random_new_piece } from "./state";

const is_valid = (state: State) => {
	if (state.piece == null) {
		return true;
	}
	const position = piece_position(state.piece);
	return position.every(
		(coord) =>
			Array.from(Array(40), (_, index) => index).includes(coord[0]) &&
			Array.from(Array(10), (_, index) => index).includes(coord[1]) &&
			!state.well[coord[0]][coord[1]]
	);
};

const is_game_over = (well: boolean[][]) => {
	return well.slice(16).some((flat) => flat.some((tile) => tile));
};

const offset_piece = (piece: Piece, offset: number[]) => {
	const result: Piece = {
		...piece,
		coord: [piece.coord[0] + offset[0], piece.coord[1] + offset[1]],
	};
	return result;
};

export const offset_state = (state: State, offset: number[]) => {
	if (state.piece == null) {
		return state;
	}
	const result: State = {
		...state,
		piece: offset_piece(state.piece, offset),
	};
	if (is_valid(result)) {
		return result;
	}
	return state;
};

export const new_state = (state: State) => {
	if (state.piece == null) {
		return state;
	}
	let well: boolean[][] = Array.from(state.well, (flat) => Array.from(flat));
	const position = piece_position(state.piece);
	position.forEach((coord) => (well[coord[0]][coord[1]] = true));
	well = well.filter((flat) => !flat.every((tile) => tile));
	let score = state.score;
	while (well.length < 20) {
		well.push(Array.from(Array(10), () => false));
		score++;
	}
	const queue = Array.from(state.queue);
	queue.pop();
	queue.unshift(state.piece.piece_type);
	const piece = is_game_over(well) ? null : random_new_piece(queue);
	const result: State = { well, piece, score, queue };
	return result;
};

export const rotate_state = (state: State, direction: Direction) => {
	if (state.piece == null) {
		return state;
	}
	const result_piece: Piece = {
		...state.piece,
		direction:
			((state.piece.direction as number) + (direction as number)) % 4,
	};
	const result_state: State = { ...state, piece: result_piece };
	if (is_valid(result_state)) {
		return result_state;
	}
	if (direction == Direction.Down || result_piece.piece_type == "I") {
		return state;
	}
	if (
		direction == Direction.Right &&
		offset_state(result_state, [0, 1]) != result_state
	) {
		return offset_state(result_state, [0, 1]);
	}
	if (offset_state(result_state, [0, -1]) != result_state) {
		return offset_state(result_state, [0, -1]);
	}
	if (
		direction == Direction.Left &&
		offset_state(result_state, [0, 1]) != result_state
	) {
		return offset_state(result_state, [0, 1]);
	}
	return state;
};
