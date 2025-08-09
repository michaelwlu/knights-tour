import { Difficulty } from "@/lib/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	createBoard,
	getNextMoveHint,
	getValidMoves,
	isAvailable,
	NOT_VISITED,
} from "../lib/boardUtils";

type UseBoardProps = {
	rows: number;
	columns: number;
	difficulty: Difficulty;
};

export type UseBoardReturn = {
	// Core state
	board: number[][];
	moveHistory: [number, number][];
	lastPosition: [number, number]; // [row, column] or [-1, -1] if no moves

	// Game status
	isStarted: boolean;
	isCompleted: boolean;
	isDeadEnd: boolean;

	// Move info and validation
	validMovesList: [number, number][];
	getIsValidMove: ([row, column]: [number, number]) => boolean;
	getIsLastMove: ([row, column]: [number, number]) => boolean;
	getMoveNumber: ([row, column]: [number, number]) => number;
	getIsVisited: ([row, column]: [number, number]) => boolean;

	// Hint system
	isHintActive: boolean;
	isHintComputing: boolean;
	hintsRemaining: number;
	maxHints: number;
	hintsUsed: number;
	getIsHintSquare: ([row, column]: [number, number]) => boolean;

	// Actions
	handleMoveNext: ([row, column]: [number, number]) => void;
	handleUndoLastMove: () => void;
	handleResetBoard: () => void;
	handleUseHint: () => void;
};

const useBoard = ({
	rows,
	columns,
	difficulty,
}: UseBoardProps): UseBoardReturn => {
	// --- Core State ---
	const [board, setBoard] = useState<number[][]>(createBoard(rows, columns));
	const [moveHistory, setMoveHistory] = useState<[number, number][]>([]);

	// Memoize lastPosition to avoid unnecessary recalculations
	const lastPosition = useMemo<[number, number]>(
		() =>
			moveHistory.length > 0 ? moveHistory[moveHistory.length - 1] : [-1, -1],
		[moveHistory]
	);

	const currentMoveNumber = moveHistory.length - 1;

	// --- Hint System State ---
	const maxHints = useMemo(() => {
		switch (difficulty) {
			case Difficulty.Easy:
				return 5;
			case Difficulty.Medium:
				return 4;
			case Difficulty.Hard:
				return 3;
			case Difficulty.Expert:
				return 0;
			default:
				return 3;
		}
	}, [difficulty]);
	const [hintsRemaining, setHintsRemaining] = useState<number>(maxHints);
	const [isHintActive, setIsHintActive] = useState<boolean>(false);
	const [hintPositions, setHintPositions] = useState<[number, number][]>([]);
	const [isHintComputing, setIsHintComputing] = useState<boolean>(false);
	// When true, we've confirmed (via a hint request) there is no solution from the current state
	const [isNoSolutionConfirmed, setIsNoSolutionConfirmed] =
		useState<boolean>(false);

	// Calculate hints used
	const hintsUsed = maxHints - hintsRemaining;

	// --- Move Info and Validation Functions ---
	const getMoveNumber = ([row, column]: [number, number]): number =>
		board[row][column];

	const getIsVisited = ([row, column]: [number, number]): boolean =>
		board[row][column] !== NOT_VISITED;

	const getIsLastMove = ([row, column]: [number, number]): boolean =>
		row === lastPosition[0] && column === lastPosition[1];

	const validMovesList: [number, number][] = getValidMoves(lastPosition, board);

	const getIsValidMove = ([row, column]: [number, number]): boolean => {
		if (moveHistory.length === 0) return true;
		return validMovesList.some(([r, c]) => r === row && c === column);
	};

	// --- Hint System Calculations ---
	// Check if a square is one of the hint squares
	const getIsHintSquare = ([row, column]: [number, number]): boolean => {
		if (!isHintActive) return false;
		return hintPositions.some(([r, c]) => r === row && c === column);
	};

	// --- Game Status Calculations ---
	const isStarted: boolean = moveHistory.length > 0;
	const isCompleted: boolean = moveHistory.length === rows * columns;
	const isDeadEnd: boolean =
		isStarted &&
		!isCompleted &&
		(validMovesList.length === 0 || isNoSolutionConfirmed);

	// --- Actions ---
	const handleMoveNext = ([row, column]: [number, number]): void => {
		if (isAvailable([row, column], board)) {
			// If a hint is active, any chosen next move should consume a hint
			const isUsingHint = isHintActive;

			setBoard((prev) => {
				const newBoard = prev.map((row) => [...row]);
				newBoard[row][column] = moveHistory.length;
				return newBoard;
			});

			setMoveHistory((prev) => [...prev, [row, column]]);

			// If using a hint, decrement the hint count
			if (isUsingHint) {
				setHintsRemaining((prev) => prev - 1);
			}

			setIsHintActive(false);
			setHintPositions([]);
			setIsNoSolutionConfirmed(false);
		}
	};

	const handleUndoLastMove = (): void => {
		const [lastRow, lastColumn] = lastPosition;

		setBoard((prev) => {
			const newBoard = prev.map((row) => [...row]);
			newBoard[lastRow][lastColumn] = NOT_VISITED;
			return newBoard;
		});

		setMoveHistory((prev) => prev.slice(0, prev.length - 1));
		setIsHintActive(false);
		setHintPositions([]);
		setIsNoSolutionConfirmed(false);
	};

	const handleResetBoard = useCallback(() => {
		setBoard(createBoard(rows, columns));
		setMoveHistory([]);
		setIsHintActive(false);
		setHintsRemaining(maxHints);
		setHintPositions([]);
		setIsNoSolutionConfirmed(false);
	}, [rows, columns, maxHints]);

	const handleUseHint = () => {
		if (
			isHintComputing ||
			isHintActive ||
			hintsRemaining <= 0 ||
			lastPosition[0] === -1
		) {
			return;
		}

		setIsHintComputing(true);
		try {
			// Calculate all valid moves that don't lead to dead ends
			const goodMoves = getNextMoveHint(lastPosition, currentMoveNumber, board);

			// Set the hint positions
			setHintPositions(goodMoves);
			// If no hint moves are available, mark as a confirmed dead end
			if (goodMoves.length === 0) {
				setIsNoSolutionConfirmed(true);
				setIsHintActive(false);
				setHintsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
			}
		} finally {
			setIsHintComputing(false);
		}
	};

	// --- Effects ---

	// Activate hint after hint positions are committed
	useEffect(() => {
		if (!isHintActive && hintPositions.length > 0) {
			setIsHintActive(true);
		}
	}, [hintPositions, isHintActive]);

	// Reset board if dimensions change
	useEffect(() => {
		handleResetBoard();
	}, [rows, columns, handleResetBoard]);

	// Reset board if difficulty changes
	useEffect(() => {
		handleResetBoard();
	}, [difficulty, handleResetBoard]);

	return {
		// Core state
		board,
		moveHistory,
		lastPosition,

		// Game status
		isStarted,
		isCompleted,
		isDeadEnd,

		// Move info and validation
		validMovesList,
		getIsValidMove,
		getIsLastMove,
		getMoveNumber,
		getIsVisited,

		// Hint system
		isHintActive,
		isHintComputing,
		hintsRemaining,
		maxHints,
		hintsUsed,
		getIsHintSquare,

		// Actions
		handleMoveNext,
		handleUndoLastMove,
		handleResetBoard,
		handleUseHint,
	};
};

export default useBoard;
