import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { useBoardContext } from "../../context/BoardContext";

const UndoButton = () => {
	const { handleUndoLastMove, isStarted, allowUndo } = useBoardContext();
	return (
		allowUndo && (
			<Button
				onClick={handleUndoLastMove}
				variant={!allowUndo ? "ghost" : "outline"}
				disabled={!isStarted || !allowUndo}
				aria-label="Undo last move"
			>
				<Undo2 aria-hidden="true" /> Undo
			</Button>
		)
	);
};

export default UndoButton;
