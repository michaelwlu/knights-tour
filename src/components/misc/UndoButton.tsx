import { Button } from "@/components/ui/button";
import { Undo } from "lucide-react";
import { useBoardContext } from "../../context/BoardContext";

const UndoButton = () => {
	const { handleUndoLastMove, isStarted } = useBoardContext();
	return (
		<Button
			onClick={handleUndoLastMove}
			variant="outline"
			disabled={!isStarted}
		>
			<Undo /> Undo
		</Button>
	);
};

export default UndoButton;
