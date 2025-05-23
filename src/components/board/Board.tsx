import { ModeToggle } from "@/components/misc/ModeToggle";
import { useEffect, useRef } from "react";
import { useBoardContext } from "../../context/BoardContext";
import ConfigBoardDimensions from "../config-dimensions/ConfigBoardDimensions";
import GameTimer from "../misc/GameTimer";
import ResetButton from "../misc/ResetButton";
import UndoButton from "../misc/UndoButton";
import ValidMovesToggle from "../misc/ValidMovesToggle";
import BoardSquare from "./BoardSquare";

const Board = () => {
	const { boardDimensions } = useBoardContext();
	const { rows, columns } = boardDimensions;
	const boardRef = useRef<HTMLDivElement>(null);

	// Force layout recalculation when dimensions change
	useEffect(() => {
		if (boardRef.current) {
			// Force Safari to recalculate layout
			const currentWidth = boardRef.current.offsetWidth;
			boardRef.current.style.width = `${currentWidth - 1}px`;
			setTimeout(() => {
				if (boardRef.current) {
					boardRef.current.style.width = "";
				}
			}, 0);
		}
	}, [rows, columns]);

	return (
		<div className="flex flex-1 w-full h-screen items-center justify-center">
			<div
				className="flex flex-col w-full items-center gap-4"
				style={{ marginTop: "-15vh" }}
			>
				<div className="w-full flex items-end justify-between py-2">
					<h1 className="text-4xl font-bold">
						Knight&apos;s
						<br />
						Tour <span className="text-5xl ml-1">♞</span>
					</h1>
					<div className="flex items-center gap-2 justify-between">
						<ConfigBoardDimensions />
						<ModeToggle />
					</div>
				</div>
				<div className="w-full flex items-center gap-2 justify-between">
					<GameTimer />
					<ValidMovesToggle />
				</div>
				<div
					ref={boardRef}
					className="grid w-full max-w-[95vw] sm:max-w-[90vw]"
					style={{
						gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
						gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
						aspectRatio: `${columns} / ${rows}`,
					}}
				>
					{Array.from({ length: rows }).map((_, row) =>
						Array.from({ length: columns }).map((_, col) => (
							<BoardSquare key={`${row}-${col}`} row={row} column={col} />
						))
					)}
				</div>
				<div className="w-full flex justify-end items-center gap-3 mt-2">
					<UndoButton />
					<ResetButton />
				</div>
			</div>
		</div>
	);
};

export default Board;
