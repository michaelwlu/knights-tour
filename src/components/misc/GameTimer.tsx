import { useBoardContext } from "@/context/BoardContext";
import { GREEN_COLOR, RED_COLOR, YELLOW_COLOR } from "@/lib/constants";
import { Timer, TimerOff, TimerReset } from "lucide-react";

const GameTimer = () => {
	const { isStarted, isCompleted, elapsedTime, formatTime, isDeadEnd } =
		useBoardContext();

	const timerClasses = "h-[1.25rem] w-[1.25rem] mb-0.5";

	return (
		<div className="flex items-center gap-1.5 text-lg">
			{!isStarted ? (
				<TimerReset className={timerClasses} color={"#a1a1aa"} />
			) : isCompleted ? (
				<TimerReset className={timerClasses} color={GREEN_COLOR} />
			) : isDeadEnd ? (
				<TimerOff className={timerClasses} color={RED_COLOR} />
			) : (
				<Timer className={timerClasses} color={YELLOW_COLOR} />
			)}

			<span className="timer-text">{formatTime(elapsedTime)}</span>
			{isCompleted && <span className="ml-1 text-base">🏆</span>}
		</div>
	);
};

export default GameTimer;
