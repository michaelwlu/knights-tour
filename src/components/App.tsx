import { ModeToggle } from "@/components/misc/ModeToggle";
import Board from "./board/Board";
import ConfigBoardDimensions from "./config-dimensions/ConfigBoardDimensions";
import GameTimer from "./misc/GameTimer";
import GithubButton from "./misc/GithubButton";
import Instructions from "./misc/Instructions";
import RestartButton from "./misc/RestartButton";
import UndoButton from "./misc/UndoButton";
import ValidMovesToggle from "./misc/ValidMovesToggle";

const App = () => {
	return (
		<div className="flex flex-1 w-full h-screen items-center justify-center">
			<div
				className="flex flex-col w-full items-center gap-4"
				style={{ marginTop: "-15vh" }}
			>
				<div className="w-full flex items-end justify-between">
					<h1 className="text-4xl font-bold">
						Knight&apos;s
						<br />
						Tour <span className="text-5xl ml-1">♞</span>
					</h1>
					<div className="flex items-center gap-2 justify-between">
						<Instructions />
						<ModeToggle />
						<GithubButton />
					</div>
				</div>
				<div className="w-full flex items-center gap-2 justify-between mt-1">
					<GameTimer />
					<ValidMovesToggle />
				</div>
				<Board />
				<div className="w-full flex justify-between items-center gap-3 mt-2">
					<ConfigBoardDimensions />
					<div className="flex justify-end items-center gap-3">
						<UndoButton />
						<RestartButton />
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
