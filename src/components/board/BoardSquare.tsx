import {
	BoardSquareButton,
	BoardSquareVariant,
	TextSizeVariant,
} from "@/components/ui/board-buttons";
import { useBoardContext } from "../../context/BoardContext";

type BoardSquareProps = {
	row: number;
	column: number;
};

const BoardSquare = ({ row, column }: BoardSquareProps) => {
	const {
		board,
		getIsLastMove,
		getIsValidMove,
		getMoveNumber,
		getIsVisited,
		handleUndoLastMove,
		handleMoveNext,
		isStarted,
		isDeadEnd,
		isCompleted,
		highlightValidMoves,
		allowUndo,
		isHintActive,
		getIsHintSquare,
		boardDimensions: { rows, columns },
	} = useBoardContext();

	if (board[row]?.[column] === undefined) {
		return null;
	}

	const isLastMove: boolean = getIsLastMove([row, column]);
	const validMove: boolean = getIsValidMove([row, column]);
	const moveNumber: number = getMoveNumber([row, column]) + 1;
	const isVisited: boolean = getIsVisited([row, column]);
	const isHintSquare: boolean = getIsHintSquare([row, column]);

	// Determine text size based on board dimensions
	const textSize =
		rows >= 11 || columns >= 11
			? TextSizeVariant.SMALL
			: rows >= 10 || columns >= 10
			? TextSizeVariant.MEDIUM
			: TextSizeVariant.LARGE;

	// Determine if this is an even square for checkerboard pattern
	const isEvenSquare = (row + column) % 2 === 0;

	// Determine the variant based on the square's state
	let variant = BoardSquareVariant.UNVISITED;

	if (isCompleted) {
		variant = BoardSquareVariant.COMPLETED;
	} else if (isLastMove) {
		variant = isDeadEnd
			? BoardSquareVariant.DEAD_END
			: BoardSquareVariant.LAST_MOVE;
	} else if (isVisited) {
		variant = BoardSquareVariant.VISITED;
	} else if (isStarted && validMove) {
		if (isHintActive) {
			// When hints are active, distinguish between hint squares and other valid moves
			variant = isHintSquare
				? BoardSquareVariant.VALID_MOVE // Full styling for hint squares
				: BoardSquareVariant.HINT_VALID_MOVE; // Subtle styling for other valid moves
		} else if (highlightValidMoves) {
			// Normal behavior when hints are not active
			variant = BoardSquareVariant.VALID_MOVE;
		}
	}

	// Determine click handler
	const handleClick = () => {
		if (isLastMove && allowUndo) {
			handleUndoLastMove();
		} else if (!isVisited && validMove) {
			handleMoveNext([row, column]);
		}
	};

	return (
		<BoardSquareButton
			variant={variant}
			isEvenSquare={isEvenSquare}
			onClick={handleClick}
			textSize={textSize}
			row={row}
			column={column}
			isHintSquare={isHintActive && isHintSquare}
		>
			{isVisited ? moveNumber : ""}
		</BoardSquareButton>
	);
};

export default BoardSquare;
