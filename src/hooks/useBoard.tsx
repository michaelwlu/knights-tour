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
	const maxHints = 3; // Starting with 3 hints
	const [hintsRemaining, setHintsRemaining] = useState<number>(maxHints);
	const [isHintActive, setIsHintActive] = useState<boolean>(false);
	const [hintPositions, setHintPositions] = useState<[number, number][]>([]);

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
		(validMovesList.length === 0 ||
			(isHintActive && hintPositions.length === 0));

	// --- Actions ---
	const handleMoveNext = ([row, column]: [number, number]): void => {
		if (isAvailable([row, column], board)) {
			// Check if this move is using a hint
			const isUsingHint = isHintActive && getIsHintSquare([row, column]);

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
	};

	const handleResetBoard = useCallback(() => {
		setBoard(createBoard(rows, columns));
		setMoveHistory([]);
		setIsHintActive(false);
		setHintsRemaining(maxHints);
		setHintPositions([]);
	}, [rows, columns, maxHints]);

	const handleUseHint = () => {
		if (!isHintActive && hintsRemaining > 0 && lastPosition[0] !== -1) {
			// Calculate all valid moves that don't lead to dead ends
			const goodMoves = getNextMoveHint(lastPosition, currentMoveNumber, board);

			// Set the hint positions
			setHintPositions(goodMoves);

			// Small delay to ensure smooth transition
			setTimeout(() => {
				setIsHintActive(true);
				// Note: hint count is now decremented when hint is used, not when activated
			}, 50);
		}
	};

	// --- Effects ---

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
