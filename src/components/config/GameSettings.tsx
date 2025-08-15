import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup } from "@/components/ui/radio-group";
import { useBoardContext } from "@/context/BoardContext";
import { useDimensionsForm } from "@/hooks/useDimensionsForm";
// Use Tailwind class-based colors instead of inline color constants
import { Difficulty } from "@/lib/types";
import { Crown, Eye, Grid2x2, Lightbulb, Reply } from "lucide-react";
import { JSX, ReactNode, useEffect, useState } from "react";
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

	// Shared description text and row helper
	const DESC = {
		VALID_HIGHLIGHTED: "Valid moves highlighted",
		VALID_NOT_HIGHLIGHTED: "Valid moves not highlighted",
		UNDO_ALLOWED: "Undo allowed",
		UNDO_NOT_ALLOWED: "Undo not allowed",
		HINTS_AVAILABLE: (count: number) => `${count} hints`,
		NO_HINTS: "No hints",
	} as const;

	type DescriptionRowProps = { icon: JSX.Element; children: ReactNode };
	const DescriptionRow = ({ icon, children }: DescriptionRowProps) => (
		<div className="flex gap-2 items-center">
			{icon}
			<span>{children}</span>
		</div>
	);

	// Difficulty descriptions
	const DIFFICULTY_DESCRIPTIONS: Record<Difficulty, JSX.Element> = {
		[Difficulty.Easy]: (
			<div className="space-y-1.5">
				<DescriptionRow icon={<Eye className="w-4 h-4 text-green-600" />}>
					{DESC.VALID_HIGHLIGHTED}
				</DescriptionRow>
				<DescriptionRow icon={<Reply className="w-4 h-4 text-green-600" />}>
					{DESC.UNDO_ALLOWED}
				</DescriptionRow>
				<DescriptionRow icon={<Lightbulb className="w-4 h-4 text-green-600" />}>
					{DESC.HINTS_AVAILABLE(5)}
				</DescriptionRow>
			</div>
		),
		[Difficulty.Medium]: (
			<div className="space-y-1.5">
				<DescriptionRow icon={<Eye className="w-4 h-4 text-red-600" />}>
					{DESC.VALID_NOT_HIGHLIGHTED}
				</DescriptionRow>
				<DescriptionRow icon={<Reply className="w-4 h-4 text-green-600" />}>
					{DESC.UNDO_ALLOWED}
				</DescriptionRow>
				<DescriptionRow icon={<Lightbulb className="w-4 h-4 text-green-600" />}>
					{DESC.HINTS_AVAILABLE(4)}
				</DescriptionRow>
			</div>
		),
		[Difficulty.Hard]: (
			<div className="space-y-1.5">
				<DescriptionRow icon={<Eye className="w-4 h-4 text-red-600" />}>
					{DESC.VALID_NOT_HIGHLIGHTED}
				</DescriptionRow>
				<DescriptionRow icon={<Reply className="w-4 h-4 text-red-600" />}>
					{DESC.UNDO_NOT_ALLOWED}
				</DescriptionRow>
				<DescriptionRow icon={<Lightbulb className="w-4 h-4 text-green-600" />}>
					{DESC.HINTS_AVAILABLE(3)}
				</DescriptionRow>
			</div>
		),
		[Difficulty.Expert]: (
			<div className="space-y-1.5">
				<DescriptionRow icon={<Eye className="w-4 h-4 text-red-600" />}>
					{DESC.VALID_NOT_HIGHLIGHTED}
				</DescriptionRow>
				<DescriptionRow icon={<Reply className="w-4 h-4 text-red-600" />}>
					{DESC.UNDO_NOT_ALLOWED}
				</DescriptionRow>
				<DescriptionRow icon={<Lightbulb className="w-4 h-4 text-red-600" />}>
					{DESC.NO_HINTS}
				</DescriptionRow>
			</div>
		),
	};

	// Get difficulty color class
	const getDifficultyColorClass = () => {
		switch (difficulty) {
			case Difficulty.Easy:
				return "text-green-600";
			case Difficulty.Medium:
				return "text-amber-600";
			case Difficulty.Hard:
				return "text-red-600";
			case Difficulty.Expert:
				return "text-fuchsia-600";
			default:
				return "text-green-600";
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className="flex">
					<Button
						variant="outline"
						className="flex gap-2 items-center rounded-r-none border-r-0"
						onClick={() => {
							setActiveTab("board");
							setOpen(true);
						}}
					>
						<Grid2x2 className="w-4 h-4" aria-hidden="true" />
						<span className="font-medium">
							{boardDimensions.rows} × {boardDimensions.columns}
						</span>
					</Button>
					<Button
						variant="outline"
						className="flex gap-2 items-center rounded-l-none"
						onClick={() => {
							setActiveTab("difficulty");
							setOpen(true);
						}}
					>
						<Crown className="w-4 h-4" aria-hidden="true" />
						<span className={`font-medium ${getDifficultyColorClass()}`}>
							{difficulty}
						</span>
					</Button>
				</div>
			</DialogTrigger>
			<DialogContent className="flex flex-col sm:max-w-md">
				<DialogHeader className="text-left">
					<DialogTitle className="text-xl">Game Settings</DialogTitle>
					<DialogDescription className="sr-only">
						Change the board size and game mode
					</DialogDescription>
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
							Mode
						</button>
					</div>

					{/* Tab Content */}
					<div className="min-h-[325px] pt-1">
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
