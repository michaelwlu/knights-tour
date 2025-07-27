const MOVES: [number, number][] = [
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
	[row, column]: [number, number],
	board: number[][]
): boolean =>
	isInbounds([row, column], board) && isUnvisited([row, column], board);

export const getValidMoves = (
	[row, column]: [number, number],
	board: number[][]
): [number, number][] => {
	if (!isInbounds([row, column], board)) {
		return [];
	}

	return MOVES.map(([rowChange, columnChange]): [number, number] => [
		row + rowChange,
		column + columnChange,
	]).filter(([newRow, newColumn]) => isAvailable([newRow, newColumn], board));
};

// Returns the list of valid moves sorted based on Warnsdorf's rule
// (Fewest to most onward moves)
export const getValidMovesWarnsdorf = (
	[row, column]: [number, number],
	board: number[][]
): [number, number][] => {
	return getValidMoves([row, column], board).sort(
		(a, b) => getValidMoves(a, board).length - getValidMoves(b, board).length
	);
};

const isInbounds = (
	[row, column]: [number, number],
	board: number[][]
): boolean => {
	const rowCount: number = board.length;
	const columnCount: number = board[0].length;
	return row >= 0 && row < rowCount && column >= 0 && column < columnCount;
};

export const isUnvisited = (
	[row, column]: [number, number],
	board: number[][]
): boolean => board[row][column] === NOT_VISITED;

// Maximum computation time for hint calculation (in milliseconds)
const MAX_COMPUTATION_TIME = 1000;

export const getNextMoveHint = (
	[currentRow, currentColumn]: [number, number],
	currentMoveNumber: number,
	board: number[][]
): [number, number][] => {
	const rows = board.length;
	const columns = board[0].length;
	const totalSquares = rows * columns;

	// If on the first move, just pick any valid move
	if (currentMoveNumber === 0) {
		return getValidMoves([currentRow, currentColumn], board);
	}

	// Get all valid moves from current position
	const validMoves = getValidMoves([currentRow, currentColumn], board);

	// No valid moves means we're in a dead end
	if (validMoves.length === 0) {
		return [];
	}

	// Array to collect moves that don't lead to dead ends
	const goodMoves: [number, number][] = [];

	// Record start time to limit computation
	const startTime = Date.now();

	// Test each valid move to see if it leads to a full solution
	for (const [nextRow, nextColumn] of validMoves) {
		// Check if we've exceeded our computation time limit
		if (Date.now() - startTime > MAX_COMPUTATION_TIME) {
			// If we're taking too long, use Warnsdorf's rule to suggest moves
			const warnsdorfMoves = getValidMovesWarnsdorf(
				[currentRow, currentColumn],
				board
			);
			if (warnsdorfMoves.length > 0) {
				// Just take the first few moves from Warnsdorf's heuristic
				return warnsdorfMoves.slice(0, Math.min(3, warnsdorfMoves.length));
			}
			break;
		}

		// Create a deep copy of the board for this move's simulation
		const boardCopy = JSON.parse(JSON.stringify(board));

		// Mark the move as visited
		boardCopy[nextRow][nextColumn] = currentMoveNumber + 1;

		// Run depth-first search to check if this move leads to a solution
		// Initialize stack with next position, index of next move to try, and current move number
		const stack: [number, number, number, number][] = [
			[nextRow, nextColumn, 0, currentMoveNumber + 2],
		];

		// Flag to track if this move leads to a solution
		let leadsToSolution = false;

		// DFS using a stack to avoid recursion
		while (stack.length > 0) {
			const [row, column, moveIndex, moveNumber] = stack[stack.length - 1];

			// If we've visited all squares, we've found a solution
			if (moveNumber === totalSquares) {
				leadsToSolution = true;
				break;
			}

			// Get valid moves ranked by Warnsdorf's rule (fewer onward moves first)
			const nextValidMoves = getValidMovesWarnsdorf([row, column], boardCopy);

			// If no more moves to try from this position, backtrack
			if (moveIndex >= nextValidMoves.length) {
				boardCopy[row][column] = NOT_VISITED; // Unmark this position
				stack.pop(); // Backtrack
				continue;
			}

			// Get next position to try
			const [nextR, nextC] = nextValidMoves[moveIndex];

			// Update stack entry to try next move index if we backtrack
			stack[stack.length - 1] = [row, column, moveIndex + 1, moveNumber];

			// Mark position as visited with current move number
			boardCopy[nextR][nextC] = moveNumber;

			// Add next position to stack with move number incremented
			stack.push([nextR, nextC, 0, moveNumber + 1]);
		}

		// If this move led to a solution, add it to good moves
		if (leadsToSolution) {
			goodMoves.push([nextRow, nextColumn]);
		}
	}

	// If we found good moves, return them
	// Otherwise, return an empty list to indicate no good moves are available
	// This prevents suggesting moves that would definitely lead to dead ends
	return goodMoves.length > 0 ? goodMoves : [];
};
