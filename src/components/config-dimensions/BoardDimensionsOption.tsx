import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { BoardDimensionOption } from "../../lib/types";

type SetDimensionButtonProps = BoardDimensionOption;

const BoardDimensionsOption = ({
	label,
	rows,
	columns,
}: SetDimensionButtonProps) => {
	// Display dimensions without categorization
	const getDisplayLabel = () => {
		return `${rows} × ${columns}`;
	};

	return (
		<div className="flex items-center space-x-3 w-full">
			<RadioGroupItem value={label} id={label} />
			<Label htmlFor={label} className="py-1 w-full">
				{getDisplayLabel()}
			</Label>
		</div>
	);
};

export default BoardDimensionsOption;
