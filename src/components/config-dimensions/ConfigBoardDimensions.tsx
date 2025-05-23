import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup } from "@/components/ui/radio-group";
import { useBoardContext } from "@/context/BoardContext";
import { Settings2 } from "lucide-react";
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
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" className="h-10">
					<Settings2 className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100" />
					{boardDimensions.rows} x {boardDimensions.columns}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto">
				<div className="mb-3 mr-4 font-semibold text-md">
					Set board dimensions
				</div>
				<RadioGroup
					value={selected}
					onValueChange={setSelected}
					className="space-y-1"
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
				<Button
					className="mt-4 w-full"
					variant="outline"
					onClick={() => {
						handleSetBoardDimensions(selectedDimensionOption);
						setOpen(false);
					}}
				>
					Apply & reset
				</Button>
			</PopoverContent>
		</Popover>
	);
};

export default ConfigBoardDimensions;
