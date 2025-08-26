import { BOARD_DIMENSION_OPTIONS } from "@/components/config-dimensions/dimensionOptions";
import { BoardDimensionOption, Difficulty } from "@/lib/types";
import { useState } from "react";

export type UseBoardConfigReturn = {
	boardDimensions: BoardDimensionOption;
	setBoardDimensions: React.Dispatch<
		React.SetStateAction<BoardDimensionOption>
	>;
	difficulty: Difficulty;
	setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
	allowUndo: boolean;
	highlightValidMoves: boolean;
	setCustomBoardDimensions: (rows: number, columns: number) => void;
	isCustomBoard: boolean;
};

// Limits for custom dimensions to prevent performance issues
const MIN_DIMENSION = 5;
const MAX_DIMENSION = 12;

const useBoardConfig = (): UseBoardConfigReturn => {
	const [boardDimensions, setBoardDimensions] = useState<BoardDimensionOption>(
		BOARD_DIMENSION_OPTIONS[0] // 5×5 default
	);
	const [isCustomBoard, setIsCustomBoard] = useState(false);

	const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Novice);
	const allowUndo =
		difficulty === Difficulty.Novice || difficulty === Difficulty.Competitor;
	const highlightValidMoves = difficulty === Difficulty.Novice;

	// Function to set custom board dimensions
	const setCustomBoardDimensions = (rows: number, columns: number) => {
		// Validate dimensions are within acceptable range
		const validatedRows = Math.max(
			MIN_DIMENSION,
			Math.min(MAX_DIMENSION, rows)
		);
		const validatedColumns = Math.max(
			MIN_DIMENSION,
			Math.min(MAX_DIMENSION, columns)
		);

		// Create a custom board dimensions object
		const customDimensions = {
			label: `Custom ${validatedRows}×${validatedColumns}`,
			rows: validatedRows,
			columns: validatedColumns,
		};

		// Update the board dimensions
		setBoardDimensions(customDimensions);

		// Set the custom flag to true
		setIsCustomBoard(true);

		// For debugging - remove in production
		console.log("Setting custom dimensions:", customDimensions);
	};

	return {
		boardDimensions,
		setBoardDimensions: (option) => {
			setBoardDimensions(option);
			setIsCustomBoard(false); // Reset custom flag when selecting a preset
		},
		difficulty,
		setDifficulty,
		allowUndo,
		highlightValidMoves,
		setCustomBoardDimensions,
		isCustomBoard,
	};
};

export default useBoardConfig;
