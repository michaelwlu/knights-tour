import { Button } from "@/components/ui/button";
import { YELLOW_COLOR } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { useBoardContext } from "../../context/BoardContext";

const HintButton = () => {
	const {
		handleUseHint,
		hintsRemaining,
		isCompleted,
		isStarted,
		isHintActive,
		maxHints,
	} = useBoardContext();
	const [prevHintsRemaining, setPrevHintsRemaining] = useState(hintsRemaining);

	// Track previous hint count when it changes
	useEffect(() => {
		if (hintsRemaining !== prevHintsRemaining) {
			setPrevHintsRemaining(hintsRemaining);
		}
	}, [hintsRemaining, prevHintsRemaining]);

	return (
		!isCompleted && (
			<div className="flex items-center gap-2">
				<Button
					onClick={handleUseHint}
					variant="outline"
					disabled={!isStarted || isHintActive || hintsRemaining === 0}
				>
					<Lightbulb color={YELLOW_COLOR} />
					<span>Hint</span>

					{/* Animate counter container */}
					<AnimatePresence>
						{
							<motion.div
								initial={{ width: 0, opacity: 0, marginLeft: 0 }}
								animate={{ width: "auto", opacity: 1, marginLeft: 1 }}
								exit={{ width: 0, opacity: 0, marginLeft: 0 }}
								transition={{ duration: 0.25, ease: "easeOut" }}
								className="flex items-center overflow-hidden"
							>
								<div className="flex items-center gap-0.5 text-xs text-muted-foreground">
									<div className="relative flex items-center justify-center w-3 h-4 overflow-hidden">
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
			</div>
		)
	);
};

export default HintButton;
