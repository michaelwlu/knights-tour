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
};

const useBoardConfig = (): UseBoardConfigReturn => {
	const [boardDimensions, setBoardDimensions] = useState<BoardDimensionOption>(
		BOARD_DIMENSION_OPTIONS[0]
	);

	const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
	const allowUndo =
		difficulty === Difficulty.Easy || difficulty === Difficulty.Medium;
	const highlightValidMoves = difficulty === Difficulty.Easy;

	return {
		boardDimensions,
		setBoardDimensions,
		difficulty,
		setDifficulty,
		allowUndo,
		highlightValidMoves,
	};
};

export default useBoardConfig;
