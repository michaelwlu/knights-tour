import { useBoardContext } from "@/context/BoardContext";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const ValidMovesToggle = () => {
	const { highlightValidMoves, setHighlightValidMoves } = useBoardContext();

	return (
		<div className="flex items-center space-x-2">
			<Switch
				id="highlight-valid-moves"
				checked={highlightValidMoves}
				onCheckedChange={(checked) => setHighlightValidMoves(checked)}
			/>
			<Label htmlFor="highlight-valid-moves">Show valid moves</Label>
		</div>
	);
};

export default ValidMovesToggle;
