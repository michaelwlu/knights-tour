import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { useBoardContext } from "../../context/BoardContext";

const UndoButton = () => {
	const { handleUndoLastMove, isStarted, isCompleted } = useBoardContext();
	return (
		!isCompleted && (
			<Button
				onClick={handleUndoLastMove}
				variant="outline"
				disabled={!isStarted}
			>
				<Undo2 /> Undo
			</Button>
		)
	);
};

export default UndoButton;
