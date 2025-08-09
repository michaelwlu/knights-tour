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

	// Determine the inner class based on aspect ratio
	const innerClass = columns < rows ? "h-full" : "w-full";

	return (
		<section
			className="w-full max-w-[95vw] md:max-w-[70vh] xl:max-w-[80vh] mx-auto flex items-center justify-center aspect-square"
			aria-label={`Knight's Tour game board, ${rows} by ${columns} squares`}
		>
			<div
				ref={boardRef}
				className={`overflow-hidden rounded-lg ${innerClass}`}
				style={{
					aspectRatio: `${columns}/${rows}`,
				}}
			>
				<div
					className="grid w-full h-full"
					style={{
						gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
						gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
					}}
					role="grid"
					aria-label={`${rows}x${columns} chess board grid`}
				>
					{Array.from({ length: rows }).map((_, row) =>
						Array.from({ length: columns }).map((_, col) => (
							<BoardSquare key={`${row}-${col}`} row={row} column={col} />
						))
					)}
				</div>
			</div>
		</section>
	);
};

export default Board;
