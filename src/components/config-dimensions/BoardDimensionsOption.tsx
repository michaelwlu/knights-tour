import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { BoardDimensionOption } from "../types/types";

type SetDimensionButtonProps = BoardDimensionOption;

const BoardDimensionsOption = ({
	label,
	rows,
	columns,
}: SetDimensionButtonProps) => {
	return (
		<div className="flex items-center space-x-2">
			<RadioGroupItem value={label} id={label} />
			<Label htmlFor={label}>
				{rows} x {columns}
			</Label>
		</div>
	);
};

export default BoardDimensionsOption;
