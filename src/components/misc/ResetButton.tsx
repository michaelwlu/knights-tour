import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
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
			<RefreshCw aria-hidden="true" />
			<span>Reset</span>
		</Button>
	);
};

export default ResetButton;
