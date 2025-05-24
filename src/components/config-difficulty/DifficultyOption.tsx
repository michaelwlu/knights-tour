import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Difficulty } from "../../lib/types";

type DifficultyButtonProps = {
	difficulty: Difficulty;
};

const DifficultyOption = ({ difficulty }: DifficultyButtonProps) => {
	return (
		<div className="flex items-center w-full space-x-3">
			<RadioGroupItem value={difficulty} id={difficulty} />
			<Label htmlFor={difficulty} className="w-full py-1">
				{difficulty}
			</Label>
		</div>
	);
};

export default DifficultyOption;
