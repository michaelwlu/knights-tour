import { ModeToggle } from "@/components/misc/ModeToggle";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useBoardContext } from "../context/BoardContext";
import Board from "./board/Board";
import GameSettings from "./config/GameSettings";
import GameTimer from "./misc/GameTimer";
import HintButton from "./misc/HintButton";
import Instructions from "./misc/Instructions";
import ResetButton from "./misc/ResetButton";
import ShareButton from "./misc/ShareButton";
import UndoButton from "./misc/UndoButton";

const App = () => {
	const { isCompleted, isDeadEnd, moveHistory, isStarted } = useBoardContext();

	// Mobile detection for action word (Tap vs Click)
	const [actionWord, setActionWord] = useState("Click");
	const [isClient, setIsClient] = useState(false);
	const isMobile = useMediaQuery("(max-width: 767px)");

	// First visit detection and instructions modal state
	const [instructionsOpen, setInstructionsOpen] = useState(false);

	// Ensure we're on the client before showing dynamic content
	useEffect(() => {
		setIsClient(true);
	}, []);

	// Update action word when media query changes (client-side only)
	useEffect(() => {
		if (isClient) {
			setActionWord(isMobile ? "Tap" : "Click");
		}
	}, [isMobile, isClient]);

	// Check if this is the user's first visit (client-side only)
	useEffect(() => {
		// Ensure we're in the browser before accessing localStorage
		if (typeof window === "undefined") return;

		try {
			const hasVisited = localStorage.getItem("knights-tour-visited");
			if (!hasVisited) {
				// First visit - open instructions deterministically (no arbitrary delay)
				setInstructionsOpen(true);
				// Mark as visited
				localStorage.setItem("knights-tour-visited", "true");
			}
		} catch (error) {
			// Handle cases where localStorage is not available (e.g., private browsing)
			console.warn("localStorage not available:", error);
		}
	}, []);

	// Generate status message for screen readers
	const getGameStatus = () => {
		if (isCompleted) return "Game completed! All squares visited.";
		if (isDeadEnd) return "Dead end reached. No valid moves available.";
		if (moveHistory.length === 0)
			return "Game ready. Choose a starting square.";
		return `${moveHistory.length} moves made.`;
	};

	return (
		<main
			className="flex justify-center items-center w-full h-full"
			role="main"
		>
			{/* Live region for game status announcements */}
			<div
				aria-live="assertive"
				aria-atomic="true"
				className="sr-only"
				role="status"
			>
				{getGameStatus()}
			</div>

			{/* Mobile/Tablet Layout - Vertical Stack (screens below 768px) */}
			<div className="flex flex-col gap-4 justify-center items-center w-full h-full md:hidden">
				<div className="flex justify-between items-end w-full">
					<h1 className="text-4xl font-bold">
						Knight&apos;s
						<br />
						Tour <span className="ml-1 text-5xl">♞</span>
					</h1>
					<div className="flex gap-1 justify-between items-center">
						<Instructions
							open={instructionsOpen}
							onOpenChange={setInstructionsOpen}
						/>
						<ModeToggle />
					</div>
				</div>
				<div className="flex gap-3 justify-between items-center mt-2 w-full">
					<GameTimer />
					<GameSettings />
				</div>
				<Board />
				<div className="flex items-start justify-center min-h-[3rem]">
					<AnimatePresence mode="wait">
						{!isStarted ? (
							<motion.div
								key="instructions"
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 10 }}
								transition={{ duration: 0.2, ease: "easeInOut" }}
								className="px-4 text-center text-zinc-600 dark:text-zinc-400"
							>
								<p className="text-lg font-medium">
									<span
										className="underline transition-colors cursor-pointer underline-offset-6 hover:text-zinc-500 dark:hover:text-zinc-300 decoration-zinc-300 dark:decoration-zinc-600 decoration-dotted hover:decoration-solid"
										onClick={() => setInstructionsOpen(true)}
									>
										{actionWord} any square to start
									</span>
								</p>
							</motion.div>
						) : (
							<div className="w-full">
								<AnimatePresence mode="wait">
									{isCompleted || isDeadEnd ? (
										<motion.div
											key="mobile-game-end-actions"
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 10 }}
											transition={{ duration: 0.2, ease: "easeInOut" }}
											className="flex gap-3 justify-center items-center w-full"
										>
											<ShareButton />
											<ResetButton />
										</motion.div>
									) : (
										<motion.div
											key="mobile-game-progress-actions"
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 10 }}
											transition={{ duration: 0.2, ease: "easeInOut" }}
											className="flex gap-3 justify-around items-center w-full"
										>
											<UndoButton />
											<HintButton />
											<ResetButton />
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* Desktop Layout - Sidebar + Main Content (screens 768px and above) */}
			<div className="hidden justify-center items-center mx-auto w-full max-w-7xl h-full md:flex">
				<div className="flex items-center w-full">
					{/* Left Sidebar - Controls */}
					<div className="flex flex-col gap-7 p-6 w-80">
						{/* Header */}
						<div className="flex flex-col gap-4 justify-between items-start">
							<h1 className="text-4xl font-bold">
								Knight&apos;s
								<br />
								Tour <span className="ml-1 text-5xl">♞</span>
							</h1>
							<div className="flex gap-2 items-center">
								<Instructions
									open={instructionsOpen}
									onOpenChange={setInstructionsOpen}
								/>
								<ModeToggle />
							</div>
						</div>

						{/* Game Timer */}
						<div className="space-y-3">
							<h2 className="text-lg font-semibold">Timer</h2>
							<GameTimer />
						</div>

						{/* Game Settings */}
						<div className="space-y-3">
							<h2 className="text-lg font-semibold">Settings</h2>
							<GameSettings />
						</div>

						{/* Game Controls / Instructions */}
						<div className="min-h-[9rem]">
							<AnimatePresence mode="wait">
								{!isStarted ? (
									<motion.div
										key="desktop-how-to-play"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2, ease: "easeInOut" }}
										className="space-y-3"
									>
										<h2 className="text-lg font-semibold">How to Play</h2>
										<div className="text-zinc-600 dark:text-zinc-400">
											<p className="text-base">
												<span
													className="underline transition-colors cursor-pointer underline-offset-6 hover:text-zinc-500 dark:hover:text-zinc-300 decoration-zinc-300 dark:decoration-zinc-600 decoration-dotted hover:decoration-solid"
													onClick={() => setInstructionsOpen(true)}
												>
													{actionWord} any square to start
												</span>
											</p>
										</div>
									</motion.div>
								) : (
									<motion.div
										key="desktop-actions"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2, ease: "easeInOut" }}
										className="space-y-2"
									>
										<h2 className="text-lg font-semibold">Actions</h2>
										<AnimatePresence mode="wait" initial={false}>
											{isCompleted || isDeadEnd ? (
												<motion.div
													key="game-end-actions"
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: -10 }}
													transition={{ duration: 0.2, ease: "easeInOut" }}
												>
													<div className="flex flex-col gap-3 items-start">
														<ShareButton />
														<ResetButton />
													</div>
												</motion.div>
											) : (
												<motion.div
													key="game-progress-actions"
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: -10 }}
													transition={{ duration: 0.2, ease: "easeInOut" }}
												>
													<div className="grid grid-cols-2 gap-3">
														<UndoButton />
														<HintButton />
														<ResetButton />
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

					{/* Main Content - Board */}
					<div className="flex flex-1 justify-center items-start p-6">
						<Board />
					</div>
				</div>
			</div>
		</main>
	);
};

export default App;
