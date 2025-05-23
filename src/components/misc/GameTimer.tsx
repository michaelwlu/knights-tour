import { useBoardContext } from "@/context/BoardContext";
import { Timer } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatTime = (seconds: number) => {
	if (seconds >= 3600) {
		const h = Math.floor(seconds / 3600)
			.toString()
			.padStart(2, "0");
		const m = Math.floor((seconds % 3600) / 60)
			.toString()
			.padStart(2, "0");
		const s = (seconds % 60).toString().padStart(2, "0");
		return `${h}:${m}:${s}`;
	} else {
		const m = Math.floor(seconds / 60)
			.toString()
			.padStart(2, "0");
		const s = (seconds % 60).toString().padStart(2, "0");
		return `${m}:${s}`;
	}
};

const GameTimer = () => {
	const { isStarted, isCompleted } = useBoardContext();
	const [elapsed, setElapsed] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (isStarted && !isCompleted) {
			intervalRef.current = setInterval(() => {
				setElapsed((t) => t + 1);
			}, 1000);
		} else if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [isStarted, isCompleted]);

	// Optionally reset timer when game is not started
	useEffect(() => {
		if (!isStarted) setElapsed(0);
	}, [isStarted]);

	const timerColor = isCompleted
		? "#16a34a"
		: isStarted
		? "#d97706"
		: "#52525b";

	return (
		<span>
			<div className="flex items-center gap-2 text-lg">
				<Timer className="h-[1.2rem] w-[1.2rem]" color={timerColor} />
				{formatTime(elapsed)}
			</div>
		</span>
	);
};

export default GameTimer;
