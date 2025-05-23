const MOVES = [
	[-1, -2],
	[-1, 2],
	[1, -2],
	[1, 2],
	[-2, -1],
	[-2, 1],
	[2, -1],
	[2, 1],
];

export const NOT_VISITED = -1; // indicates not yet visited

export const createBoard = (rows: number, columns: number): number[][] =>
	new Array(rows).fill(0).map(() => new Array(columns).fill(-1));

export const isAvailable = (
	row: number,
	column: number,
	board: number[][]
): boolean => isInbounds(row, column, board) && isUnvisited(row, column, board);

export const getValidMoves = (
	[row, column]: number[],
	board: number[][]
): number[][] => {
	if (!isInbounds(row, column, board)) {
		return [];
	}

	return MOVES.map(([rowChange, columnChange]) => [
		row + rowChange,
		column + columnChange,
	]).filter(([newRow, newColumn]) => isAvailable(newRow, newColumn, board));
};

const isInbounds = (
	row: number,
	column: number,
	board: number[][]
): boolean => {
	const rowCount: number = board.length;
	const columnCount: number = board[0].length;
	return row >= 0 && row < rowCount && column >= 0 && column < columnCount;
};

export const isUnvisited = (
	row: number,
	column: number,
	board: number[][]
): boolean => board[row][column] === NOT_VISITED;
