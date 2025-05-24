import useBoard from "@/hooks/useBoard";
import useBoardConfig from "@/hooks/useBoardConfig";
import { useGameTimer } from "@/hooks/useGameTimer";
import React, { createContext, useContext } from "react";

type BoardContextType = ReturnType<typeof useBoardConfig> &
	ReturnType<typeof useBoard> &
	ReturnType<typeof useGameTimer>;

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
	const boardConfig = useBoardConfig();

	const { boardDimensions, difficulty } = boardConfig;

	const board = useBoard({
		...boardDimensions,
		difficulty,
	});

	const { isStarted, isCompleted, isDeadEnd } = board;

	const gameTimer = useGameTimer({
		isStarted,
		isCompleted,
		isDeadEnd,
	});

	return (
		<BoardContext.Provider value={{ ...boardConfig, ...board, ...gameTimer }}>
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
