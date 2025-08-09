import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useBoardContext } from "../../context/BoardContext";

const ResetButton = () => {
	const { handleResetBoard, isStarted } = useBoardContext();
	return (
		<Button
			onClick={handleResetBoard}
			variant="outline"
			disabled={!isStarted}
			aria-label="Reset game board"
		>
			<RotateCcw aria-hidden="true" /> Reset
		</Button>
	);
};

export default ResetButton;
