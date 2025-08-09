import useBoard from "@/hooks/useBoard";
import useBoardConfig from "@/hooks/useBoardConfig";
import { useGameTimer } from "@/hooks/useGameTimer";
import React, { createContext, useContext, useEffect, useState } from "react";

type BoardContextType = ReturnType<typeof useBoardConfig> &
	ReturnType<typeof useBoard> &
	ReturnType<typeof useGameTimer> & {
		isTransitioning: boolean;
	};

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
	const boardConfig = useBoardConfig();

	const { boardDimensions, difficulty, allowUndo } = boardConfig;

	const board = useBoard({
		...boardDimensions,
		difficulty,
	});

	const { isStarted, isCompleted, isDeadEnd } = board;

	// Track the display allowUndo value and transition state
	const [displayAllowUndo, setDisplayAllowUndo] = useState(allowUndo);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		// When difficulty changes while game is started, mark as transitioning
		if (isStarted && allowUndo !== displayAllowUndo) {
			setIsTransitioning(true);
		}
	}, [allowUndo, displayAllowUndo, isStarted]);

	useEffect(() => {
		// Only update displayAllowUndo when the game is not started and not transitioning
		if (!isStarted && !isTransitioning) {
			setDisplayAllowUndo(allowUndo);
		}

		// Reset transition state when game stops
		if (!isStarted && isTransitioning) {
			// Use a small delay to ensure UI transition completes first
			const timeoutId = setTimeout(() => {
				setDisplayAllowUndo(allowUndo);
				setIsTransitioning(false);
			}, 250); // Slightly longer than the 200ms animation duration

			return () => clearTimeout(timeoutId);
		}
	}, [allowUndo, isStarted, isTransitioning]);

	const gameTimer = useGameTimer({
		isStarted,
		isCompleted,
		isDeadEnd,
	});

	return (
		<BoardContext.Provider
			value={{
				...boardConfig,
				...board,
				...gameTimer,
				allowUndo: displayAllowUndo, // Override with the display value
				isTransitioning, // Expose transition state
			}}
		>
			{children}
		</BoardContext.Provider>
	);
};

export const useBoardContext = () => {
	const context = useContext(BoardContext);
	if (context === undefined) {
		throw new Error("useBoardContext must be used within a BoardProvider");
	}
	return context;
};
