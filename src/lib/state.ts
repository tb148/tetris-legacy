import piece_data from "./piece_data.json";

type PieceType = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export enum Direction {
	Up,
	Right,
	Down,
	Left,
}

export type Piece = {
	piece_type: PieceType;
	direction: Direction;
	coord: number[];
};

export type State = {
	well: boolean[][];
	piece: Piece | null;
	score: number;
	queue: PieceType[];
};

export const piece_position = (piece: Piece) => {
	const data: number[][] = piece_data[piece.piece_type][piece.direction];
	return data.map((coord) => [
		piece.coord[0] + coord[0],
		piece.coord[1] + coord[1],
	]);
};

const piece_types: PieceType[] = ["I", "J", "L", "O", "S", "T", "Z"];

export const random_new_piece = (queue: PieceType[]) => {
	const valid_piece_types = piece_types.filter(
		(valid_piece_type) => !queue.includes(valid_piece_type)
	);
	const piece_type =
		valid_piece_types[Math.floor(Math.random() * valid_piece_types.length)];
	const result: Piece = {
		piece_type,
		direction: Direction.Up,
		coord: [16, 3],
	};
	return result;
};

const empty_well = () =>
	Array.from(Array(20), () => Array.from(Array(10), () => false));

export const empty_state = () => {
	const result: State = {
		well: empty_well(),
		piece: random_new_piece(["S", "Z", "S", "Z"]),
		score: 0,
		queue: ["S", "Z", "S", "Z"],
	};
	return result;
};

export const offset = [
	[1, 0],
	[0, 1],
	[-1, 0],
	[0, -1],
];
