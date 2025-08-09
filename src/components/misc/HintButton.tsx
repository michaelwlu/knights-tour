import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { useBoardContext } from "../../context/BoardContext";

const HintButton = () => {
	const {
		handleUseHint,
		hintsRemaining,
		isStarted,
		isHintActive,
		isHintComputing,
		isDeadEnd,
		maxHints,
	} = useBoardContext();
	const [prevHintsRemaining, setPrevHintsRemaining] = useState(hintsRemaining);
	const [hasAnimated, setHasAnimated] = useState(false);

	// Track previous hint count when it changes
	useEffect(() => {
		if (hintsRemaining !== prevHintsRemaining) {
			setPrevHintsRemaining(hintsRemaining);
		}
	}, [hintsRemaining, prevHintsRemaining]);

	// Mark as animated after first render when game starts
	useEffect(() => {
		if (isStarted && !hasAnimated) {
			setHasAnimated(true);
		}
	}, [isStarted, hasAnimated]);

	return (
		<Button
			onClick={isHintActive || isHintComputing ? undefined : handleUseHint}
			variant="outline"
			disabled={
				!isStarted ||
				isHintComputing ||
				isDeadEnd ||
				(!isHintActive && hintsRemaining === 0)
			}
			aria-label={`Get hint for next move. ${hintsRemaining} of ${maxHints} hints remaining`}
			className={
				isHintActive
					? "bg-amber-50 border-amber-300 cursor-default hover:bg-amber-100 dark:bg-amber-950/50 dark:border-amber-800 dark:hover:bg-amber-900/60"
					: ""
			}
		>
			<Lightbulb className="text-yellow-500" aria-hidden="true" />
			<span>Hint</span>

			{/* Animate counter container */}
			<AnimatePresence>
				{
					<motion.div
						initial={
							hasAnimated ? { width: 0, opacity: 0, marginLeft: 0 } : false
						}
						animate={{ width: "auto", opacity: 1, marginLeft: 1 }}
						exit={{ width: 0, opacity: 0, marginLeft: 0 }}
						transition={{ duration: 0.25, ease: "easeOut" }}
						className="flex overflow-hidden items-center"
					>
						<div className="flex items-center gap-0.5 text-xs text-muted-foreground">
							<div className="flex overflow-hidden relative justify-center items-center w-3 h-4">
								<AnimatePresence mode="popLayout" initial={false}>
									{/* Current number sliding in from bottom */}
									<motion.span
										key={hintsRemaining}
										initial={{ y: "100%", opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ duration: 0.3, ease: "easeOut" }}
										className="absolute"
									>
										{hintsRemaining}
									</motion.span>

									{/* Previous number exiting to top */}
									{hintsRemaining !== prevHintsRemaining &&
										prevHintsRemaining !== maxHints && (
											<motion.span
												key={`prev-${prevHintsRemaining}`}
												initial={{ y: 0, opacity: 1 }}
												exit={{ y: "-100%", opacity: 0 }}
												transition={{ duration: 0.3, ease: "easeIn" }}
												className="absolute"
											>
												{prevHintsRemaining}
											</motion.span>
										)}
								</AnimatePresence>
							</div>
							<span>/</span>
							<span>{maxHints}</span>
						</div>
					</motion.div>
				}
			</AnimatePresence>
		</Button>
	);
};

export default HintButton;
