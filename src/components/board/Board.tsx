import { useBoardContext } from "@/context/BoardContext";
import { useEffect, useRef } from "react";
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
	);
};

export default Board;
