import { Difficulty } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import {
	createBoard,
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
	board: number[][];
	moveHistory: number[][];
	lastPosition: number[]; // [row, column] or [-1, -1] if no moves
	isLastMove: (row: number, column: number) => boolean;
	validMovesList: number[][];
	isDeadEnd: boolean;
	isStarted: boolean;
	isCompleted: boolean;
	isValidMove: (row: number, column: number) => boolean;
	handleMoveNext: (row: number, column: number) => void;
	handleUndoLastMove: () => void;
	handleResetBoard: () => void;
};

const useBoard = ({
	rows,
	columns,
	difficulty,
}: UseBoardProps): UseBoardReturn => {
	const [board, setBoard] = useState<number[][]>(createBoard(rows, columns));
	const [moveHistory, setMoveHistory] = useState<number[][]>([]);

	const lastPosition: number[] =
		moveHistory.length > 0 ? moveHistory[moveHistory.length - 1] : [-1, -1];

	const isLastMove = (row: number, column: number): boolean =>
		row === lastPosition[0] && column === lastPosition[1];

	const validMovesList: number[][] = getValidMoves(lastPosition, board);

	const isValidMove = (row: number, column: number): boolean => {
		if (moveHistory.length === 0) return true;

		return validMovesList.some(([r, c]) => r === row && c === column);
	};

	const handleMoveNext = (row: number, column: number): void => {
		if (isAvailable(row, column, board)) {
			setBoard((prev) => {
				const newBoard = prev.map((row) => [...row]);
				newBoard[row][column] = moveHistory.length;
				return newBoard;
			});

			setMoveHistory((prev) => [...prev, [row, column]]);
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
	};

	const handleResetBoard = useCallback(() => {
		setBoard(createBoard(rows, columns));
		setMoveHistory([]);
	}, [rows, columns]);

	// Reset board if dimensions change
	useEffect(() => {
		handleResetBoard();
	}, [rows, columns, handleResetBoard]);

	// Reset board if difficulty changes
	useEffect(() => {
		handleResetBoard();
	}, [difficulty, handleResetBoard]);

	const isStarted: boolean = moveHistory.length > 0;

	const isCompleted: boolean = moveHistory.length === rows * columns;

	const isDeadEnd: boolean =
		isStarted && !isCompleted && validMovesList.length === 0;

	return {
		board,
		moveHistory,
		lastPosition,
		isLastMove,
		validMovesList,
		isStarted,
		isDeadEnd,
		isCompleted,
		isValidMove,
		handleMoveNext,
		handleUndoLastMove,
		handleResetBoard,
	};
};

export default useBoard;
