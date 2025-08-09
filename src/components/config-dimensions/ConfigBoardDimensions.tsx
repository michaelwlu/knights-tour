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
import { Grip } from "lucide-react";
import { useEffect, useState } from "react";
import BoardDimensionsOption from "./BoardDimensionsOption";
import CustomDimensionsInput from "./CustomDimensionsInput";
import { BOARD_DIMENSION_OPTIONS } from "./dimensionOptions";

const ConfigBoardDimensions = () => {
	const {
		boardDimensions,
		setBoardDimensions,
		isCustomBoard,
		setCustomBoardDimensions,
		isStarted,
	} = useBoardContext();

	const [selected, setSelected] = useState(
		isCustomBoard ? "custom" : boardDimensions.label
	);
	const [open, setOpen] = useState(false);

	// Use the custom hook for form logic, passing dialog open state
	const { form, isValid } = useDimensionsForm(open);

	const selectedDimensionOption =
		selected === "custom"
			? boardDimensions // If custom is selected, use current board dimensions
			: BOARD_DIMENSION_OPTIONS.find(({ label }) => label === selected) ||
			  BOARD_DIMENSION_OPTIONS[0];

	const selectCustom = () => {
		setSelected("custom");
	};

	useEffect(() => {
		if (!open) {
			setSelected(isCustomBoard ? "custom" : boardDimensions.label);
		}
	}, [open, boardDimensions.label, isCustomBoard]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Grip className="h-[1.5rem] w-[1.5rem] mt-0.5" />
					{boardDimensions.rows} × {boardDimensions.columns}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
				<DialogHeader className="text-left">
					<DialogTitle className="text-xl">Set Board Dimensions</DialogTitle>
				</DialogHeader>
				<div className="mt-1 space-y-7">
					<RadioGroup value={selected} onValueChange={setSelected}>
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
					<div className="space-y-5">
						{isStarted && (
							<div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md dark:bg-amber-950/20 dark:border-amber-800/50">
								<div className="text-amber-600 dark:text-amber-400 mt-0.5">
									⚠️
								</div>
								<p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
									Changing board dimensions will reset your current progress
								</p>
							</div>
						)}
						<Button
							className="w-full"
							variant="default"
							disabled={selected === "custom" && !isValid}
							onClick={() => {
								if (selected === "custom") {
									// Apply custom dimensions only when the Apply button is clicked
									const values = form.getValues();
									setCustomBoardDimensions(values.rows, values.columns);
								} else {
									// Apply standard dimensions
									setBoardDimensions(selectedDimensionOption);
								}
								setOpen(false);
							}}
						>
							Apply
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ConfigBoardDimensions;
