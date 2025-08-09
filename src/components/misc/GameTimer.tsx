import { useBoardContext } from "@/context/BoardContext";
import { GREEN_COLOR, RED_COLOR, YELLOW_COLOR } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { Timer, TimerOff, TimerReset } from "lucide-react";

const GameTimer = () => {
	const { isStarted, isCompleted, elapsedTime, formatTime, isDeadEnd } =
		useBoardContext();

	const timerClasses = "h-[1.25rem] w-[1.25rem] mb-0.5";

	return (
		<div
			className="flex items-center gap-1.5 text-lg"
			role="status"
			aria-live="polite"
		>
			<AnimatePresence mode="wait">
				{!isStarted ? (
					<motion.div
						key="timer-reset"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
					>
						<TimerReset
							className={timerClasses}
							color={"#a1a1aa"}
							aria-hidden="true"
						/>
					</motion.div>
				) : isCompleted ? (
					<motion.div
						key="timer-completed"
						initial={{ scale: 0.8, opacity: 0, rotate: -180 }}
						animate={{ scale: 1, opacity: 1, rotate: 0 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<TimerReset
							className={timerClasses}
							color={GREEN_COLOR}
							aria-hidden="true"
						/>
					</motion.div>
				) : isDeadEnd ? (
					<motion.div
						key="timer-stopped"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeInOut" }}
					>
						<TimerOff
							className={timerClasses}
							color={RED_COLOR}
							aria-hidden="true"
						/>
					</motion.div>
				) : (
					<motion.div
						key="timer-running"
						initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
						animate={{
							scale: 1,
							opacity: 1,
							rotate: 0,
						}}
						exit={{ scale: 0.8, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
					>
						<Timer
							className={timerClasses}
							color={YELLOW_COLOR}
							aria-hidden="true"
						/>
					</motion.div>
				)}
			</AnimatePresence>

			<span
				className="timer-text"
				aria-label={`Game time: ${formatTime(elapsedTime)}`}
			>
				{formatTime(elapsedTime)}
			</span>

			<AnimatePresence>
				{isCompleted && (
					<motion.span
						className="ml-1 text-base"
						aria-label="Game completed"
						role="img"
						initial={{ scale: 0, opacity: 0, rotate: -180 }}
						animate={{ scale: 1, opacity: 1, rotate: 0 }}
						exit={{ scale: 0, opacity: 0, rotate: 180 }}
						transition={{ duration: 0.4, ease: "easeInOut" }}
					>
						🏆
					</motion.span>
				)}
			</AnimatePresence>
		</div>
	);
};

export default GameTimer;
