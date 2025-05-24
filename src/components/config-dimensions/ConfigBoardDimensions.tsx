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
import { Grip } from "lucide-react";
import { useEffect, useState } from "react";
import BoardDimensionsOption from "./BoardDimensionsOption";
import { BOARD_DIMENSION_OPTIONS } from "./dimensionOptions";

const ConfigBoardDimensions = () => {
	const { boardDimensions, handleSetBoardDimensions } = useBoardContext();

	const [selected, setSelected] = useState(boardDimensions.label);
	const [open, setOpen] = useState(false);

	const selectedDimensionOption =
		BOARD_DIMENSION_OPTIONS.find(({ label }) => label === selected) ??
		BOARD_DIMENSION_OPTIONS[0];

	useEffect(() => {
		if (!open) {
			setSelected(boardDimensions.label);
		}
	}, [open, boardDimensions.label]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Grip className="h-[1.5rem] w-[1.5rem] mt-0.5" />
					{boardDimensions.rows} × {boardDimensions.columns}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader className="text-left">
					<DialogTitle className="text-xl">Set Board Dimensions</DialogTitle>
				</DialogHeader>
				<div className="mt-1 space-y-5">
					<RadioGroup
						value={selected}
						onValueChange={setSelected}
						className="space-y-2"
					>
						{BOARD_DIMENSION_OPTIONS.map(({ label, rows, columns }) => (
							<BoardDimensionsOption
								key={label}
								label={label}
								rows={rows}
								columns={columns}
							/>
						))}
					</RadioGroup>
					<p className="text-sm text-muted-foreground">
						Changing board dimensions will reset your current progress
					</p>
					<Button
						className="w-full"
						variant="default"
						onClick={() => {
							handleSetBoardDimensions(selectedDimensionOption);
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

export default ConfigBoardDimensions;
