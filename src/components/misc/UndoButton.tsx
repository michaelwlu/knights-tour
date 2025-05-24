import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { useBoardContext } from "../../context/BoardContext";

const UndoButton = () => {
	const { handleUndoLastMove, isStarted, isCompleted, allowUndo } =
		useBoardContext();
	return (
		!isCompleted &&
		allowUndo && (
			<Button
				onClick={handleUndoLastMove}
				variant={!allowUndo ? "ghost" : "outline"}
				disabled={!isStarted || !allowUndo}
			>
				<Undo2 /> Undo
			</Button>
		)
	);
};

export default UndoButton;
