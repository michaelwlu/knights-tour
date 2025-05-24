import { Button } from "@/components/ui/button";
import { useBoardContext } from "@/context/BoardContext";
import { SITE_URL } from "@/lib/constants";
import { Copy, CopyCheck, Send } from "lucide-react";
import { useState } from "react";

const ShareButton = () => {
	const { isCompleted, boardDimensions, elapsedTime, formatTime, difficulty } =
		useBoardContext();
	const [showCopiedMessage, setShowCopiedMessage] = useState(false);

	// Create share message with game stats
	const createShareText = () => {
		const { rows, columns } = boardDimensions;
		const boardSize = `${rows}×${columns}`;
		const timeFormatted = formatTime(elapsedTime);
		return `I completed the Knight's Tour on a ${boardSize} board (${difficulty} mode) in ${timeFormatted}!`;
	};

	const handleShare = () => {
		const shareText = createShareText();

		// Check if the Web Share API is supported
		if (navigator.share) {
			navigator
				.share({
					title: "Knight's Tour",
					text: shareText,
					url: SITE_URL,
				})
				.catch((error) => {
					console.log("Sharing failed:", error);
					if (error.name !== "AbortError") {
						copyToClipboard(shareText);
					}
				});
		} else {
			copyToClipboard(shareText);
		}
	};

	// Copy to clipboard function
	const copyToClipboard = (text: string) => {
		// Add URL for clipboard sharing
		const textWithUrl = `${text}\n\nPlay at: ${SITE_URL}`;

		// Use clipboard API with fallback
		try {
			navigator.clipboard
				.writeText(textWithUrl)
				.then(() => {
					// Show success message briefly
					setShowCopiedMessage(true);
					setTimeout(() => setShowCopiedMessage(false), 2000);
				})
				.catch((err) => {
					console.error("Clipboard write failed:", err);
					alert("Please manually copy and share:\n\n" + textWithUrl);
				});
		} catch (err) {
			console.error("Clipboard API not available:", err);
			alert("Please manually copy and share:\n\n" + textWithUrl);
		}
	};

	return isCompleted ? (
		<div className="inline-flex rounded-md shadow-sm">
			<Button
				onClick={handleShare}
				variant="default"
				className="rounded-r-none"
			>
				<Send className="w-4 h-4 mr-2" />
				{showCopiedMessage ? "Copied!" : "Share Score"}
			</Button>
			<Button
				onClick={() => copyToClipboard(createShareText())}
				variant="default"
				className="border-l rounded-l-none border-primary-foreground/80"
				title="Copy to clipboard"
			>
				{showCopiedMessage ? (
					<CopyCheck className="w-4 h-4" />
				) : (
					<Copy className="w-4 h-4" />
				)}
			</Button>
		</div>
	) : null;
};

export default ShareButton;
