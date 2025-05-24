import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useBoardContext } from "../../context/BoardContext";

const RestartButton = () => {
	const { handleResetBoard, isStarted } = useBoardContext();
	return (
		<Button onClick={handleResetBoard} variant="outline" disabled={!isStarted}>
			<RotateCcw />
			Reset
		</Button>
	);
};

export default RestartButton;
