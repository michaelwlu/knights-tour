import { cn } from "@/lib/utils";
import * as React from "react";
import { useMemo } from "react";

// Define enums first
export enum BoardSquareVariant {
	UNVISITED = "unvisited",
	LAST_MOVE = "lastMove",
	DEAD_END = "deadEnd",
	VISITED = "visited",
	VALID_MOVE = "validMove",
	HINT_VALID_MOVE = "hintValidMove",
	COMPLETED = "completed",
}

export enum TextSizeVariant {
	SMALL = "small",
	MEDIUM = "medium",
	LARGE = "large",
}

// Style variants for different square states - using enum values as keys
const squareVariants = {
	[BoardSquareVariant.UNVISITED]:
		"bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-black dark:text-white",
	[BoardSquareVariant.LAST_MOVE]:
		"bg-amber-200 dark:bg-amber-800 hover:bg-amber-400 dark:hover:bg-amber-700 text-black dark:text-amber-100",
	[BoardSquareVariant.DEAD_END]:
		"bg-red-200 dark:bg-red-900 hover:bg-red-300 dark:hover:bg-red-800 text-red-950 dark:text-red-100",
	[BoardSquareVariant.VISITED]:
		"bg-zinc-300 dark:bg-zinc-700 text-gray-950 dark:text-gray-100",
	[BoardSquareVariant.VALID_MOVE]:
		"bg-amber-100 dark:bg-amber-950 hover:bg-amber-300 dark:hover:bg-amber-900 text-black dark:text-amber-100",
	[BoardSquareVariant.HINT_VALID_MOVE]:
		"bg-amber-50 dark:bg-amber-900/50 hover:bg-amber-200 dark:hover:bg-amber-800/70 text-black/60 dark:text-amber-100/60",
	[BoardSquareVariant.COMPLETED]:
		"bg-green-200 dark:bg-green-900 hover:bg-green-300 dark:hover:bg-green-800 text-gray-900 dark:text-green-50",
};

// Text size variants - using enum values as keys
const textSizes = {
	[TextSizeVariant.SMALL]: "text-sm",
	[TextSizeVariant.MEDIUM]: "text-base",
	[TextSizeVariant.LARGE]: "text-lg",
};

// Base styles for all squares
const squareBase =
	"aspect-square rounded-none p-0 inline-flex items-center justify-center font-bold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

// Checkerboard pattern for unvisited squares
export const checkerboardOddSquare = "bg-zinc-200 dark:bg-zinc-800";

// Border styles
const applyBorders = (row: number, column: number) =>
	cn("border-zinc-400 dark:border-zinc-400", {
		"border-t": row === 0, // Top row gets top border
		"border-l": column === 0, // Left column gets left border
		"border-r": true, // All cells get right border
		"border-b": true, // All cells get bottom border
	});

// Keyframe animation for the hint pulse effect with internal glow
const hintPulseStyles = `
@keyframes hint-pulse {
  0% { box-shadow: inset 0 0 0 0 rgba(245, 158, 11, 0.4); }
  70% { box-shadow: inset 0 0 8px 3px rgba(245, 158, 11, 0.4); }
  100% { box-shadow: inset 0 0 0 0 rgba(245, 158, 11, 0); }
}
`;

// Add the animation to global styles
if (typeof document !== "undefined") {
	const styleEl = document.createElement("style");
	styleEl.textContent = hintPulseStyles;
	document.head.appendChild(styleEl);
}

interface BoardSquareButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: BoardSquareVariant;
	isEvenSquare?: boolean;
	textSize?: TextSizeVariant;
	row?: number;
	column?: number;
	isHintSquare?: boolean;
}

export const BoardSquareButton = React.forwardRef<
	HTMLButtonElement,
	BoardSquareButtonProps
>(
	(
		{
			className,
			variant = BoardSquareVariant.UNVISITED,
			isEvenSquare = true,
			textSize = TextSizeVariant.MEDIUM,
			row,
			column,
			isHintSquare = false,
			style,
			...props
		},
		ref
	) => {
		// Optimize class name generation with useMemo to avoid recalculations
		const combinedClassNames = useMemo(() => {
			// Default to using the provided variant or fall back to UNVISITED
			const variantStyle =
				squareVariants[variant] ?? squareVariants[BoardSquareVariant.UNVISITED];

			// Apply checkerboard pattern only to unvisited squares
			const checkerboardClass =
				variant === BoardSquareVariant.UNVISITED && !isEvenSquare
					? checkerboardOddSquare
					: "";

			// Get text size class, defaulting to SMALL if invalid
			const textSizeClass =
				textSizes[textSize] ?? textSizes[TextSizeVariant.SMALL];

			// Apply border classes if both row and column are provided
			const borderClasses =
				row !== undefined && column !== undefined
					? applyBorders(row, column)
					: "";

			return cn(
				squareBase,
				variantStyle,
				checkerboardClass,
				textSizeClass,
				borderClasses,
				className
			);
		}, [variant, isEvenSquare, textSize, row, column, className]);

		// Add pulsing glow effect for hint squares with VALID_MOVE variant
		const hintGlowStyles =
			variant === BoardSquareVariant.VALID_MOVE && isHintSquare
				? {
						animation: "hint-pulse 1.5s infinite ease-in-out",
						boxShadow: "inset 0 0 0 0 rgba(245, 158, 11, 0.4)",
				  }
				: {};

		return (
			<button
				ref={ref}
				className={combinedClassNames}
				style={{ ...style, ...hintGlowStyles }}
				{...props}
			/>
		);
	}
);

BoardSquareButton.displayName = "BoardSquareButton";
