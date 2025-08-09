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
	const moves = getValidMoves([row, column], board);

	// Pre-compute move counts to avoid redundant getValidMoves calls during sorting
	const movesWithCounts = moves.map((move) => ({
		move,
		count: getValidMoves(move, board).length,
	}));

	// Sort by count (Warnsdorf's rule: fewest onward moves first)
	movesWithCounts.sort((a, b) => a.count - b.count);

	// Return just the moves in sorted order
	return movesWithCounts.map((item) => item.move);
};

const isInbounds = (
	[row, column]: [number, number],
	board: number[][]
): boolean => {
	const rowCount: number = board.length;
	if (rowCount === 0) return false; // Guard against empty board
	const columnCount: number = board[0].length;
	if (columnCount === 0) return false; // Guard against empty rows
	return row >= 0 && row < rowCount && column >= 0 && column < columnCount;
};

export const isUnvisited = (
	[row, column]: [number, number],
	board: number[][]
): boolean => board[row][column] === NOT_VISITED;

// Maximum computation time for hint calculation (in milliseconds)
const MAX_COMPUTATION_TIME = 750;

// Limit how many candidate root moves we deeply explore (Warnsdorf-ranked)
const MAX_HINT_CANDIDATES = 4;

const cloneBoard = (board: number[][]): number[][] =>
	board.map((row) => row.slice());

// DFS stack frame fields:
// [row, column, nextMoveIndexToTry, nextMoveNumberToAssign]
// - nextMoveNumberToAssign represents the board value that will be written
//   to the next visited square. With zero-based numbering (0..N-1), when this
//   reaches totalSquares (N), it means 0..N-1 have already been assigned and
//   the tour is complete.
type StackFrame = [
	row: number,
	column: number,
	moveIndex: number,
	nextMoveNumberToAssign: number
];

export const getNextMoveHint = (
	[currentRow, currentColumn]: [number, number],
	currentMoveNumber: number,
	board: number[][]
): [number, number][] => {
	const rowsCount = board.length;
	const columnsCount = board[0].length;
	const totalSquares = rowsCount * columnsCount;

	// If on the first move, just pick any valid move
	if (currentMoveNumber === 0) {
		return getValidMoves([currentRow, currentColumn], board);
	}

	// Get all valid moves from current position (ranked by heuristic)
	const rankedAll = getValidMovesWarnsdorf([currentRow, currentColumn], board);

	// No valid moves means we're in a dead end
	if (rankedAll.length === 0) {
		return [];
	}

	// Array to collect moves that don't lead to dead ends
	const goodMoves: [number, number][] = [];

	// Record start time to limit computation
	const startTime = Date.now();

	// Explore only the top-ranked candidates to reduce branching
	const rankedCandidates = rankedAll.slice(
		0,
		Math.min(MAX_HINT_CANDIDATES, rankedAll.length)
	);

	// Test each top-ranked valid move to see if it leads to a full solution
	for (const [nextRow, nextColumn] of rankedCandidates) {
		// Check if we've exceeded our computation time limit
		if (Date.now() - startTime > MAX_COMPUTATION_TIME) {
			// If we're taking too long, stop exploring further.
			// We only return moves we have proven to lead to a full solution.
			break;
		}

		// Create a deep copy of the board for this move's simulation
		const boardCopy = cloneBoard(board);

		// Mark the candidate next move as visited with the immediate next move number.
		// If the last placed number on the real board is k, we place k+1 here.
		boardCopy[nextRow][nextColumn] = currentMoveNumber + 1;

		// Prepare DFS to continue from this position. We track the
		// "next move number to assign" as a running counter. After placing k+1
		// above, the next number we intend to assign during DFS is k+2.
		const nextMoveNumberToAssign = currentMoveNumber + 2;

		// Initialize stack with next position, index of next move to try,
		// and the next number that will be assigned if we move again.
		const stack: StackFrame[] = [
			[nextRow, nextColumn, 0, nextMoveNumberToAssign],
		];

		// Flag to track if this move leads to a solution
		let leadsToSolution = false;

		// DFS using a stack to avoid recursion
		while (stack.length > 0) {
			const [row, column, moveIndex, nextMoveNumberToAssignLocal] =
				stack[stack.length - 1];

			// If we've visited all squares, we've found a solution
			// If the next number to assign equals totalSquares (N),
			// it means numbers 0..N-1 have already been assigned.
			if (nextMoveNumberToAssignLocal === totalSquares) {
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
			stack[stack.length - 1] = [
				row,
				column,
				moveIndex + 1,
				nextMoveNumberToAssignLocal,
			];

			// Mark position as visited with the current nextMoveNumberToAssign
			boardCopy[nextR][nextC] = nextMoveNumberToAssignLocal;

			// Add next position to stack with the next number incremented
			stack.push([nextR, nextC, 0, nextMoveNumberToAssignLocal + 1]);
		}

		// If this move led to a solution, add it to good moves
		if (leadsToSolution) {
			goodMoves.push([nextRow, nextColumn]);
		}

		// If we have enough good candidates, stop early
		if (goodMoves.length >= MAX_HINT_CANDIDATES) {
			return goodMoves.slice(0, MAX_HINT_CANDIDATES);
		}
	}

	// If we found good moves, return them
	// Otherwise, return an empty list to indicate no good moves are available
	// This prevents suggesting moves that would definitely lead to dead ends
	if (goodMoves.length > 0) {
		return goodMoves;
	}

	// If none of the explored candidates lead to a full solution, do not
	// suggest heuristic moves as hints. Returning an empty list communicates
	// that no safe, solution-leading moves are known from this position.
	return [];
};
