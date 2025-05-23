import { BOARD_DIMENSION_OPTIONS } from "@/components/config-dimensions/dimensionOptions";
import { BoardDimensionOption } from "@/components/types/types";
import { useState } from "react";

export type UseBoardConfigReturn = {
	boardDimensions: BoardDimensionOption;
	handleSetBoardDimensions: (
		boardDimensionOption: BoardDimensionOption
	) => void;
	highlightValidMoves: boolean;
	setHighlightValidMoves: React.Dispatch<React.SetStateAction<boolean>>;
};

const useBoardConfig = (): UseBoardConfigReturn => {
	const [boardDimensions, setBoardDimensions] = useState<BoardDimensionOption>(
		BOARD_DIMENSION_OPTIONS[0]
	);
	const [highlightValidMoves, setHighlightValidMoves] =
		useState<boolean>(false);

	const handleSetBoardDimensions = (
		boardDimensionOption: BoardDimensionOption
	): void => setBoardDimensions(boardDimensionOption);

	return {
		boardDimensions,
		handleSetBoardDimensions,
		highlightValidMoves,
		setHighlightValidMoves,
	};
};

export default useBoardConfig;
