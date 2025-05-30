import { ModeToggle } from "@/components/misc/ModeToggle";
import Board from "./board/Board";
import ConfigDifficulty from "./config-difficulty/ConfigDifficulty";
import ConfigBoardDimensions from "./config-dimensions/ConfigBoardDimensions";
import GameTimer from "./misc/GameTimer";
import Instructions from "./misc/Instructions";
import RestartButton from "./misc/RestartButton";
import ShareButton from "./misc/ShareButton";
import UndoButton from "./misc/UndoButton";

const App = () => {
	return (
		<div className="flex items-center justify-center flex-1 w-full h-full">
			<div className="flex flex-col items-center w-full gap-4">
				<div className="flex items-end justify-between w-full">
					<h1 className="text-4xl font-bold">
						Knight&apos;s
						<br />
						Tour <span className="ml-1 text-5xl">♞</span>
					</h1>
					<div className="flex items-center justify-between gap-1">
						<Instructions />
						<ModeToggle />
					</div>
				</div>
				<div className="flex items-center justify-between w-full gap-3 mt-2">
					<GameTimer />
					<div className="flex items-center justify-end gap-3">
						<ConfigBoardDimensions />
						<ConfigDifficulty />
					</div>
				</div>
				<Board />
				<div className="flex items-center justify-around gap-3 mt-0.5">
					<UndoButton />
					<ShareButton />
					<RestartButton />
				</div>
			</div>
		</div>
	);
};

export default App;
