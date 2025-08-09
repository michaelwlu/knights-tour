import { Button } from "@/components/ui/button";
import { Reply } from "lucide-react";
import { useBoardContext } from "../../context/BoardContext";

interface UndoButtonProps {
	iconOnly?: boolean;
}

const UndoButton = ({ iconOnly = false }: UndoButtonProps) => {
	const { handleUndoLastMove, isStarted, allowUndo } = useBoardContext();
	return (
		allowUndo && (
			<Button
				onClick={handleUndoLastMove}
				variant={"outline"}
				disabled={!isStarted}
				aria-label="Undo last move"
				className={iconOnly ? "px-3" : ""}
			>
				<Reply aria-hidden="true" />
				{!iconOnly && <span>Undo</span>}
			</Button>
		)
	);
};

export default UndoButton;
