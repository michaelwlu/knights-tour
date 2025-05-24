import { Button } from "@/components/ui/button";
import { useBoardContext } from "@/context/BoardContext";
import { SITE_URL } from "@/lib/constants";
import { Send } from "lucide-react";

const ShareButton = () => {
	const { isCompleted, boardDimensions, elapsedTime, formatTime, difficulty } =
		useBoardContext();

	const handleShare = () => {
		// Create share message with game stats
		const { rows, columns } = boardDimensions;
		const boardSize = `${rows}×${columns}`;
		const timeFormatted = formatTime(elapsedTime);

		// Don't include the URL in the share text since the Web Share API adds it separately
		const shareText = `I completed the Knight's Tour on a ${boardSize} board (${difficulty} mode) in ${timeFormatted}!`;

		// Check if the Web Share API is supported
		if (navigator.share) {
			navigator
				.share({
					title: "Play the Knight's Tour Puzzle",
					text: shareText,
					url: "https://" + SITE_URL,
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
		// Add URL for clipboard sharing since it won't be automatically added like in Web Share API
		const textWithUrl = `${text}\n\nPlay at: ${SITE_URL}`;

		try {
			navigator.clipboard
				.writeText(textWithUrl)
				.then(() => {
					alert("Share text copied to clipboard!");
				})
				.catch(() => {
					alert("Please manually copy and share:\n\n" + textWithUrl);
				});
		} catch {
			// Error ignored, just show the fallback alert
			alert("Please manually copy and share:\n\n" + textWithUrl);
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
