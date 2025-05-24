import { useBoardContext } from "@/context/BoardContext";
import { Timer, TimerReset } from "lucide-react";

const GameTimer = () => {
	const { isStarted, isCompleted, elapsedTime, formatTime } = useBoardContext();

	const timerColor = isCompleted
		? "#16a34a"
		: isStarted
		? "#d97706"
		: "#a1a1aa";

	return (
		<div className="flex items-center gap-1.5 text-lg">
			{!isStarted ? (
				<TimerReset
					className="h-[1.3rem] w-[1.3rem] mb-0.5"
					color={timerColor}
				/>
			) : isCompleted ? (
				<TimerReset
					className="h-[1.3rem] w-[1.3rem] mb-0.5"
					color={timerColor}
				/>
			) : (
				<Timer className="h-[1.3rem] w-[1.3rem] mb-0.5" color={timerColor} />
			)}

			<span className="timer-text">{formatTime(elapsedTime)}</span>
			{isCompleted && <span className="ml-1 text-base">🏆</span>}
		</div>
	);
};

export default GameTimer;
