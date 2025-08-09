import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup } from "@/components/ui/radio-group";
import { useBoardContext } from "@/context/BoardContext";
import { useDimensionsForm } from "@/hooks/useDimensionsForm";
import { GREEN_COLOR, RED_COLOR, YELLOW_COLOR } from "@/lib/constants";
import { Difficulty } from "@/lib/types";
import { CheckCircle2, SlidersHorizontal, XCircle } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import DifficultyOption from "../config-difficulty/DifficultyOption";
import BoardDimensionsOption from "../config-dimensions/BoardDimensionsOption";
import CustomDimensionsInput from "../config-dimensions/CustomDimensionsInput";
import { BOARD_DIMENSION_OPTIONS } from "../config-dimensions/dimensionOptions";

const GameSettings = () => {
	const {
		boardDimensions,
		setBoardDimensions,
		isCustomBoard,
		setCustomBoardDimensions,
		difficulty,
		setDifficulty,
		isStarted,
	} = useBoardContext();

	// Dimensions state
	const [selectedDimensions, setSelectedDimensions] = useState(
		isCustomBoard ? "custom" : boardDimensions.label
	);

	// Difficulty state
	const [selectedDifficulty, setSelectedDifficulty] =
		useState<Difficulty>(difficulty);

	// Dialog state
	const [open, setOpen] = useState(false);

	// Tab state
	const [activeTab, setActiveTab] = useState<"board" | "difficulty">("board");

	// Use the custom hook for form logic, passing dialog open state
	const { form, isValid } = useDimensionsForm(open);

	const selectedDimensionOption =
		selectedDimensions === "custom"
			? boardDimensions // If custom is selected, use current board dimensions
			: BOARD_DIMENSION_OPTIONS.find(
					({ label }) => label === selectedDimensions
			  ) || BOARD_DIMENSION_OPTIONS[0];

	const selectCustom = () => {
		setSelectedDimensions("custom");
	};

	// Reset selections when dialog closes
	useEffect(() => {
		if (!open) {
			setSelectedDimensions(isCustomBoard ? "custom" : boardDimensions.label);
			setSelectedDifficulty(difficulty);
			setActiveTab("board"); // Reset to first tab
		}
	}, [open, boardDimensions.label, isCustomBoard, difficulty]);

	// Difficulty descriptions
	const DIFFICULTY_DESCRIPTIONS: Record<Difficulty, JSX.Element> = {
		[Difficulty.Easy]: (
			<div className="space-y-1.5">
				<div className="flex gap-2 items-center">
					<CheckCircle2 className="w-4 h-4 text-green-500" />
					<span>Valid moves are shown</span>
				</div>
				<div className="flex gap-2 items-center">
					<CheckCircle2 className="w-4 h-4 text-green-500" />
					<span>Undo moves are allowed</span>
				</div>
			</div>
		),
		[Difficulty.Medium]: (
			<div className="space-y-1.5">
				<div className="flex gap-2 items-center">
					<XCircle className="w-4 h-4 text-red-500" />
					<span>Valid moves are hidden</span>
				</div>
				<div className="flex gap-2 items-center">
					<CheckCircle2 className="w-4 h-4 text-green-500" />
					<span>Undo moves are allowed</span>
				</div>
			</div>
		),
		[Difficulty.Hard]: (
			<div className="space-y-1.5">
				<div className="flex gap-2 items-center">
					<XCircle className="w-4 h-4 text-red-500" />
					<span>Valid moves are hidden</span>
				</div>
				<div className="flex gap-2 items-center">
					<XCircle className="w-4 h-4 text-red-500" />
					<span>No undoing moves</span>
				</div>
			</div>
		),
	};

	// Get difficulty color
	const getDifficultyColor = () => {
		switch (difficulty) {
			case Difficulty.Easy:
				return GREEN_COLOR;
			case Difficulty.Medium:
				return YELLOW_COLOR;
			case Difficulty.Hard:
				return RED_COLOR;
			default:
				return GREEN_COLOR;
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="flex gap-2 items-center">
					<SlidersHorizontal
						className="h-[1.2rem] w-[1.2rem]"
						aria-hidden="true"
					/>
					<span>
						{boardDimensions.rows} × {boardDimensions.columns}
					</span>
					<div className="w-px h-4 bg-border" />
					<span style={{ color: getDifficultyColor() }}>{difficulty}</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col sm:max-w-md">
				<DialogHeader className="text-left">
					<DialogTitle className="text-xl">Game Settings</DialogTitle>
				</DialogHeader>
				<div>
					{/* Tab Navigation */}
					<div className="flex mb-3 border-b border-border">
						<button
							onClick={() => setActiveTab("board")}
							className={`px-4 py-1.5 font-medium border-b-2 transition-colors ${
								activeTab === "board"
									? "border-primary text-primary"
									: "border-transparent text-muted-foreground hover:text-foreground"
							}`}
						>
							Board Size
						</button>
						<button
							onClick={() => setActiveTab("difficulty")}
							className={`px-4 py-1.5 font-medium border-b-2 transition-colors ${
								activeTab === "difficulty"
									? "border-primary text-primary"
									: "border-transparent text-muted-foreground hover:text-foreground"
							}`}
						>
							Difficulty
						</button>
					</div>

					{/* Tab Content */}
					<div className="min-h-[330px] pt-1 pb-2">
						{activeTab === "board" && (
							<RadioGroup
								value={selectedDimensions}
								onValueChange={setSelectedDimensions}
							>
								{BOARD_DIMENSION_OPTIONS.map(({ label, rows, columns }) => (
									<BoardDimensionsOption
										key={label}
										label={label}
										rows={rows}
										columns={columns}
									/>
								))}
								<CustomDimensionsInput form={form} onSelect={selectCustom} />
							</RadioGroup>
						)}

						{activeTab === "difficulty" && (
							<>
								<RadioGroup
									value={selectedDifficulty}
									onValueChange={(value) =>
										setSelectedDifficulty(value as Difficulty)
									}
									className="pb-4"
								>
									{Object.values(Difficulty).map((diff) => (
										<DifficultyOption
											key={diff}
											difficulty={diff as Difficulty}
										/>
									))}
								</RadioGroup>

								{/* Difficulty Description */}
								<div className="pl-3 border-l">
									{DIFFICULTY_DESCRIPTIONS[selectedDifficulty] || (
										<p>No description available.</p>
									)}
								</div>
							</>
						)}
					</div>
				</div>

				{/* Warning and Apply Button - Fixed at bottom */}
				<div className="space-y-4">
					{isStarted && (
						<div className="flex gap-2 items-center px-3 py-2 bg-amber-50 rounded-md border border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/50">
							<div className="text-amber-600 dark:text-amber-400">⚠️</div>
							<p className="text-sm font-medium text-amber-800 dark:text-amber-200">
								Changing game settings will reset your current progress
							</p>
						</div>
					)}
					<Button
						className="w-full"
						variant="default"
						disabled={selectedDimensions === "custom" && !isValid}
						onClick={() => {
							// Apply dimensions
							if (selectedDimensions === "custom") {
								const values = form.getValues();
								setCustomBoardDimensions(values.rows, values.columns);
							} else {
								setBoardDimensions(selectedDimensionOption);
							}

							// Apply difficulty
							setDifficulty(selectedDifficulty);

							setOpen(false);
						}}
					>
						Apply
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default GameSettings;
