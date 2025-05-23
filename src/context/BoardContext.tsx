import { createContext, useContext } from "react";
import useBoard, { UseBoardReturn } from "../hooks/useBoard";
import useBoardConfig, { UseBoardConfigReturn } from "../hooks/useBoardConfig";

type BoardContextType = (UseBoardConfigReturn & UseBoardReturn) | null;

const BoardContext = createContext<BoardContextType>(null);

export const BoardContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { boardDimensions, ...boardConfig } = useBoardConfig();
	const boardObject = useBoard(boardDimensions);

	return (
		<BoardContext
			value={{
				boardDimensions,
				...boardConfig,
				...boardObject,
			}}
		>
			{children}
		</BoardContext>
	);
};

export const useBoardContext = () => {
	const context = useContext(BoardContext);

	if (!context) {
		throw new Error(
			"useBoardContext must be used within a BoardContextProvider"
		);
	}

	return context;
};
