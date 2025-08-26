import { ModeToggle } from "@/components/misc/ModeToggle";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Difficulty } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
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
	const {
		isCompleted,
		isDeadEnd,
		moveHistory,
		isStarted,
		difficulty,
		isTransitioning,
	} = useBoardContext();

	// Mobile detection for action word (Tap vs Click)
	const [actionWord, setActionWord] = useState("Click");
	const [isClient, setIsClient] = useState(false);
	const isMobile = useMediaQuery("(max-width: 767px)");

	// First visit detection and instructions modal state
	const [instructionsOpen, setInstructionsOpen] = useState(false);

	// Settings dialog state - separate for mobile and desktop
	const [mobileSettingsOpen, setMobileSettingsOpen] = useState(false);
	const [desktopSettingsOpen, setDesktopSettingsOpen] = useState(false);

	// Track display difficulty to prevent layout changes during transitions
	const [displayDifficulty, setDisplayDifficulty] = useState(difficulty);

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

	// Update display difficulty only when not transitioning and game not started
	useEffect(() => {
		if (!isStarted && !isTransitioning) {
			setDisplayDifficulty(difficulty);
		}
	}, [difficulty, isStarted, isTransitioning]);

	// Apply game state classes to body element for full-screen grid pattern
	// Removed useEffect; we will toggle a class directly on the main element
	const isActive = isStarted && !isCompleted && !isDeadEnd;

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
			className={`flex justify-center items-center w-full h-full ${
				isActive ? "game-started" : "game-not-started"
			}`}
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
					<h1 className="flex flex-col gap-1 text-4xl font-bold">
						<div>Knight&apos;s</div>
						<div className="flex gap-2 items-center">
							Tour
							<Image
								src="/logo.png"
								alt="Knight's Tour Logo"
								width={30}
								height={30}
								className="w-9 h-9 dark:invert"
							/>
						</div>
					</h1>
					<div className="flex gap-1 justify-between items-center">
						<Instructions
							open={instructionsOpen}
							onOpenChange={setInstructionsOpen}
							onOpenSettings={() => setMobileSettingsOpen(true)}
						/>
						<ModeToggle />
					</div>
				</div>
				<div className="flex gap-3 justify-between items-center mt-2 w-full">
					<GameTimer />
					<GameSettings
						open={mobileSettingsOpen}
						onOpenChange={setMobileSettingsOpen}
					/>
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
									{isCompleted ? (
										<motion.div
											key="mobile-game-end-actions"
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 10 }}
											transition={{ duration: 0.2, ease: "easeInOut" }}
											className="flex gap-3 justify-center items-center w-full"
										>
											<UndoButton iconOnly={true} />
											<ResetButton />
											<ShareButton />
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
											<ResetButton />
											{displayDifficulty !== Difficulty.Grandmaster && (
												<HintButton />
											)}
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
							<h1 className="flex flex-col gap-2 items-start text-4xl font-bold">
								<Image
									src="/logo.png"
									alt="Knight's Tour Logo"
									width={40}
									height={40}
									className="w-10 h-10 dark:invert"
								/>
								<div>
									Knight&apos;s
									<br />
									Tour
								</div>
							</h1>
							<div className="flex gap-2 items-center">
								<Instructions
									open={instructionsOpen}
									onOpenChange={setInstructionsOpen}
									onOpenSettings={() => setDesktopSettingsOpen(true)}
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
							<GameSettings
								open={desktopSettingsOpen}
								onOpenChange={setDesktopSettingsOpen}
							/>
						</div>

						{/* Game Controls / Instructions */}
						<div className="min-h-[9rem]">
							<AnimatePresence mode="wait">
								{!isStarted ? (
									<motion.div
										key="desktop-how-to-play"
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
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
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 10 }}
										transition={{ duration: 0.2, ease: "easeInOut" }}
										className="space-y-2"
									>
										<h2 className="text-lg font-semibold">Actions</h2>
										<div className="flex flex-col gap-3 items-start">
											{displayDifficulty === Difficulty.Expert ||
											displayDifficulty === Difficulty.Grandmaster ? (
												// Hard/Expert mode: Put Hint button next to Reset button
												<>
													<div className="flex gap-3">
														<UndoButton />
														<ResetButton />
														{!isCompleted &&
															displayDifficulty === Difficulty.Expert && (
																<HintButton />
															)}
													</div>
													<AnimatePresence mode="wait" initial={false}>
														{isCompleted && (
															<motion.div
																key="share"
																initial={{ opacity: 0, y: -10 }}
																animate={{ opacity: 1, y: 0 }}
																exit={{ opacity: 0, y: 10 }}
																transition={{
																	duration: 0.2,
																	ease: "easeInOut",
																}}
															>
																<ShareButton />
															</motion.div>
														)}
													</AnimatePresence>
												</>
											) : (
												// Easy/Medium mode: Keep original layout
												<>
													<div className="flex gap-3">
														<UndoButton />
														<ResetButton />
													</div>
													<AnimatePresence mode="wait" initial={false}>
														{isCompleted ? (
															<motion.div
																key="share"
																initial={{ opacity: 0, y: -10 }}
																animate={{ opacity: 1, y: 0 }}
																exit={{ opacity: 0, y: 10 }}
																transition={{
																	duration: 0.2,
																	ease: "easeInOut",
																}}
															>
																<ShareButton />
															</motion.div>
														) : (
															<motion.div
																key="hint"
																initial={{ opacity: 0, y: -10 }}
																animate={{ opacity: 1, y: 0 }}
																exit={{ opacity: 0, y: 10 }}
																transition={{
																	duration: 0.2,
																	ease: "easeInOut",
																}}
															>
																<HintButton />
															</motion.div>
														)}
													</AnimatePresence>
												</>
											)}
										</div>
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
