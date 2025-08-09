import { Button } from "@/components/ui/button";
import { useBoardContext } from "@/context/BoardContext";
import { SITE_URL } from "@/lib/constants";
import { Clipboard, ClipboardCheck, Send } from "lucide-react";
import { useState } from "react";

const ShareButton = () => {
	const { boardDimensions, elapsedTime, formatTime, difficulty, hintsUsed } =
		useBoardContext();
	const [showCopiedMessage, setShowCopiedMessage] = useState(false);

	// Create share message with game stats
	const createShareText = () => {
		const { rows, columns } = boardDimensions;
		const boardSize = `${rows}×${columns}`;
		const timeFormatted = formatTime(elapsedTime);
		const hintsText =
			hintsUsed > 0
				? ` using ${hintsUsed} hint${hintsUsed === 1 ? "" : "s"}`
				: "";
		return `I completed the Knight's Tour on a ${boardSize} board (${difficulty} mode) in ${timeFormatted}${hintsText}!`;
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

	return (
		<div className="inline-flex rounded-md shadow-sm">
			<Button
				onClick={handleShare}
				variant="default"
				className="rounded-r-none"
				aria-label="Share your game score"
			>
				<Send className="mr-1 w-4 h-4" aria-hidden="true" />
				{showCopiedMessage ? "Copied!" : "Share Score"}
			</Button>
			<Button
				onClick={() => copyToClipboard(createShareText())}
				variant="default"
				className="rounded-l-none border-l border-primary-foreground/80"
				aria-label="Copy score to clipboard"
			>
				{showCopiedMessage ? (
					<ClipboardCheck className="w-4 h-4" aria-hidden="true" />
				) : (
					<Clipboard className="w-4 h-4" aria-hidden="true" />
				)}
				<span className="sr-only">Copy to clipboard</span>
			</Button>
		</div>
	);
};

export default ShareButton;
