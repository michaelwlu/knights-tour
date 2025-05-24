import { ModeToggle } from "@/components/misc/ModeToggle";
import Board from "./board/Board";
import ConfigBoardDimensions from "./config-dimensions/ConfigBoardDimensions";
import GameTimer from "./misc/GameTimer";
import Instructions from "./misc/Instructions";
import RestartButton from "./misc/RestartButton";
import ShareButton from "./misc/ShareButton";
import UndoButton from "./misc/UndoButton";
import ValidMovesToggle from "./misc/ValidMovesToggle";

const App = () => {
	return (
		<div className="flex items-center justify-center flex-1 w-full h-[85vh]">
			<div className="flex flex-col items-center w-full gap-3">
				<div className="flex items-end justify-between w-full">
					<h1 className="text-4xl font-bold">
						Knight&apos;s
						<br />
						Tour <span className="ml-1 text-5xl">♞</span>
					</h1>
					<div className="flex items-center justify-between gap-2">
						<Instructions />
						<ModeToggle />
					</div>
				</div>
				<div className="flex items-center justify-between w-full gap-2 mt-2">
					<GameTimer />
					<ValidMovesToggle />
				</div>
				<Board />
				<div className="flex items-center justify-between w-full gap-3 mt-2">
					<ConfigBoardDimensions />
					<div className="flex items-center justify-end gap-2">
						<UndoButton />
						<ShareButton />
						<RestartButton />
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
