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

	if (isCompleted) {
		return (
			<CompletedBoardSquareButton
				onClick={() => lastMove && allowUndo && handleUndoLastMove()}
				className={borderClasses}
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
					className={borderClasses}
				>
					{moveNumber}
				</DeadEndSquareButton>
			);
		} else {
			return (
				<LastMoveSquareButton
					onClick={() => allowUndo && handleUndoLastMove()}
					className={borderClasses}
				>
					{moveNumber}
				</LastMoveSquareButton>
			);
		}
	}

	return visited ? (
		<VisitedSquareButton className={borderClasses}>
			{moveNumber}
		</VisitedSquareButton>
	) : highlightValidMoves && validMove && isStarted ? (
		<ValidMoveSquareButton
			onClick={() => validMove && handleMoveNext(row, column)}
			className={borderClasses}
		></ValidMoveSquareButton>
	) : (
		<UnvisitedSquareButton
			onClick={() => validMove && handleMoveNext(row, column)}
			className={borderClasses}
		></UnvisitedSquareButton>
	);
};

export default BoardSquare;
