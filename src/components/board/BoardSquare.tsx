import {
	CompletedBoardSquareButton,
	DeadEndSquareButton,
	LastMoveSquareButton,
	UnvisitedSquareButton,
	ValidMoveSquareButton,
	VisitedSquareButton,
} from "@/components/ui/board-buttons";
import { cn } from "@/lib/utils";
import { useBoardContext } from "../../context/BoardContext";
import { NOT_VISITED } from "../../lib/boardUtils";

type BoardSquareProps = {
	row: number;
	column: number;
};

const BoardSquare = ({ row, column }: BoardSquareProps) => {
	const {
		board,
		isLastMove,
		isValidMove,
		handleUndoLastMove,
		handleMoveNext,
		isStarted,
		isDeadEnd,
		isCompleted,
		highlightValidMoves,
		allowUndo,
		boardDimensions: { rows, columns },
	} = useBoardContext();

	if (board[row]?.[column] === undefined) {
		return null;
	}

	const lastMove: boolean = isLastMove(row, column);
	const validMove: boolean = isValidMove(row, column);
	const visited: boolean = board[row][column] !== NOT_VISITED;
	const moveNumber: number = board[row][column] + 1;

	const borderClasses = cn("border-zinc-400 dark:border-zinc-400", {
		"border-t": row === 0, // Top row gets top border
		"border-l": column === 0, // Left column gets left border
		"border-r": true, // All cells get right border
		"border-b": true, // All cells get bottom border
	});

	const textClasses =
		rows >= 11 || columns >= 11
			? "text-sm"
			: rows >= 10 || columns >= 10
			? "text-base"
			: "text-lg";

	const combinedClasses = cn(borderClasses, textClasses);

	// Determine checkerboard pattern for unvisited squares
	const isEvenSquare = (row + column) % 2 === 0;
	const checkerboardClasses = !visited
		? isEvenSquare
			? ""
			: "bg-zinc-200 dark:bg-zinc-800"
		: "";

	if (isCompleted) {
		return (
			<CompletedBoardSquareButton
				onClick={() => lastMove && allowUndo && handleUndoLastMove()}
				className={combinedClasses}
			>
				{moveNumber}
			</CompletedBoardSquareButton>
		);
	}

	if (lastMove) {
		if (isDeadEnd) {
			return (
				<DeadEndSquareButton
					onClick={() => allowUndo && handleUndoLastMove()}
					className={combinedClasses}
				>
					{moveNumber}
				</DeadEndSquareButton>
			);
		} else {
			return (
				<LastMoveSquareButton
					onClick={() => allowUndo && handleUndoLastMove()}
					className={combinedClasses}
				>
					{moveNumber}
				</LastMoveSquareButton>
			);
		}
	}

	return visited ? (
		<VisitedSquareButton className={combinedClasses}>
			{moveNumber}
		</VisitedSquareButton>
	) : highlightValidMoves && validMove && isStarted ? (
		<ValidMoveSquareButton
			onClick={() => validMove && handleMoveNext(row, column)}
			className={combinedClasses}
		></ValidMoveSquareButton>
	) : (
		<UnvisitedSquareButton
			onClick={() => validMove && handleMoveNext(row, column)}
			className={cn(combinedClasses, checkerboardClasses)}
		></UnvisitedSquareButton>
	);
};

export default BoardSquare;
