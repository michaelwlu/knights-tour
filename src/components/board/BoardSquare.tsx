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

	// Handle keyboard interaction
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleClick();
		}
	};

	// Determine if square should be focusable
	const isInteractive = (isLastMove && allowUndo) || (!isVisited && validMove);

	// Determine if this square is a corner to apply rounded corners to outermost squares
	const isTopLeft = row === 0 && column === 0;
	const isTopRight = row === 0 && column === columns - 1;
	const isBottomLeft = row === rows - 1 && column === 0;
	const isBottomRight = row === rows - 1 && column === columns - 1;

	const roundedClass = isTopLeft
		? "rounded-tl-lg"
		: isTopRight
		? "rounded-tr-lg"
		: isBottomLeft
		? "rounded-bl-lg"
		: isBottomRight
		? "rounded-br-lg"
		: "";

	return (
		<BoardSquareButton
			variant={variant}
			isEvenSquare={isEvenSquare}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			textSize={textSize}
			row={row}
			column={column}
			isHintSquare={isHintActive && isHintSquare}
			highlightValidMoves={highlightValidMoves}
			isValidMove={validMove}
			className={roundedClass}
			tabIndex={isInteractive ? 0 : -1}
			role="gridcell"
			aria-label={
				isLastMove
					? `Current position: ${moveNumber}. Press Enter to undo.`
					: !isVisited && validMove
					? `Valid move to row ${row + 1}, column ${
							column + 1
					  }. Press Enter to move.`
					: isVisited
					? `Move ${moveNumber}: row ${row + 1}, column ${column + 1}.`
					: `Row ${row + 1}, column ${column + 1}. Not available.`
			}
		>
			{isVisited ? moveNumber : ""}
		</BoardSquareButton>
	);
};

export default BoardSquare;
