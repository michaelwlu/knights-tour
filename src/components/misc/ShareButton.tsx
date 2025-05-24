import { Button } from "@/components/ui/button";
import { useBoardContext } from "@/context/BoardContext";
import { SITE_URL } from "@/lib/urls";
import { Send } from "lucide-react";

const ShareButton = () => {
	const { isCompleted, boardDimensions, elapsedTime, formatTime } =
		useBoardContext();

	const handleShare = () => {
		// Create share message with game stats
		const { rows, columns } = boardDimensions;
		const boardSize = `${rows}×${columns}`;
		const timeFormatted = formatTime(elapsedTime);

		const shareText = `I completed the Knight's Tour on a ${boardSize} board in ${timeFormatted}! Can you solve it too? 🧐 Play at ${SITE_URL}`;

		// Check if the Web Share API is supported
		if (navigator.share) {
			navigator
				.share({
					title: "Play the Knight's Tour Puzzle",
					text: shareText,
					url: SITE_URL,
				})
				.catch((error) => {
					console.log("Error sharing", error);
					// Only use fallback if it's not a user abort error
					if (error.name !== "AbortError") {
						fallbackShare(shareText);
					}
				});
		} else {
			fallbackShare(shareText);
		}
	};

	// Fallback share mechanism
	const fallbackShare = (text: string) => {
		try {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					alert("Share text copied to clipboard!");
				})
				.catch(() => {
					alert("Please manually copy and share:\n\n" + text);
				});
		} catch {
			// Error ignored, just show the fallback alert
			alert("Please manually copy and share:\n\n" + text);
		}
	};

	return (
		isCompleted && (
			<Button onClick={isCompleted ? handleShare : undefined} variant="default">
				<Send className="w-4 h-4" />
				Share Score
			</Button>
		)
	);
};

export default ShareButton;
