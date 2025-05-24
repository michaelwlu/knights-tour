import { useBoardContext } from "@/context/BoardContext";
import { GREEN_COLOR, RED_COLOR, YELLOW_COLOR } from "@/lib/constants";
import { CheckCircle2, Gauge, XCircle } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { Difficulty } from "../../lib/types";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { RadioGroup } from "../ui/radio-group";
import DifficultyOption from "./DifficultyOption";

const ConfigDifficulty = () => {
	const { difficulty, setDifficulty } = useBoardContext();

	const [selected, setSelected] = useState<Difficulty>(difficulty);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) {
			setSelected(difficulty);
		}
	}, [open, difficulty]);

	const DIFFICULTY_DESCRIPTIONS: Record<Difficulty, JSX.Element> = {
		[Difficulty.Easy]: (
			<div className="space-y-1.5">
				<div className="flex items-center gap-2">
					<CheckCircle2 className="w-4 h-4 text-green-500" />
					<span>Valid moves are shown</span>
				</div>
				<div className="flex items-center gap-2">
					<CheckCircle2 className="w-4 h-4 text-green-500" />
					<span>Undo moves are allowed</span>
				</div>
			</div>
		),
		[Difficulty.Medium]: (
			<div className="space-y-1.5">
				<div className="flex items-center gap-2">
					<XCircle className="w-4 h-4 text-red-500" />
					<span>Valid moves are hidden</span>
				</div>
				<div className="flex items-center gap-2">
					<CheckCircle2 className="w-4 h-4 text-green-500" />
					<span>Undo moves are allowed</span>
				</div>
			</div>
		),
		[Difficulty.Hard]: (
			<div className="space-y-1.5">
				<div className="flex items-center gap-2">
					<XCircle className="w-4 h-4 text-red-500" />
					<span>Valid moves are hidden</span>
				</div>
				<div className="flex items-center gap-2">
					<XCircle className="w-4 h-4 text-red-500" />
					<span>No undoing moves</span>
				</div>
			</div>
		),
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Gauge
						className="h-[1.5rem] w-[1.5rem] mt-0.5"
						color={
							difficulty === Difficulty.Easy
								? GREEN_COLOR
								: difficulty === Difficulty.Medium
								? YELLOW_COLOR
								: RED_COLOR
						}
					/>
					{difficulty}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader className="text-left">
					<DialogTitle className="text-xl">Set Difficulty</DialogTitle>
				</DialogHeader>
				<div className="mt-1 space-y-5">
					<RadioGroup
						value={selected}
						onValueChange={(value) => setSelected(value as Difficulty)}
						className="pb-1"
					>
						{Object.values(Difficulty).map((difficulty) => (
							<DifficultyOption
								key={difficulty}
								difficulty={difficulty as Difficulty}
							/>
						))}
					</RadioGroup>
					{/* Display difficulty description */}
					<div className="pl-3 border-l">
						{DIFFICULTY_DESCRIPTIONS[selected] || (
							<p>No description available.</p>
						)}
					</div>
					<p className="text-sm text-muted-foreground">
						Changing difficulty will reset your current progress
					</p>
					<Button
						className="w-full"
						variant="default"
						onClick={() => {
							setDifficulty(selected);
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

export default ConfigDifficulty;
