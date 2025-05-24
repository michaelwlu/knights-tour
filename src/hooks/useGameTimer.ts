import { useCallback, useEffect, useRef, useState } from "react";

interface UseGameTimerProps {
	isStarted: boolean;
	isCompleted: boolean;
}

export function useGameTimer({ isStarted, isCompleted }: UseGameTimerProps) {
	const [elapsedTime, setElapsedTime] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Start/stop timer based on game state
	useEffect(() => {
		if (isStarted && !isCompleted) {
			intervalRef.current = setInterval(() => {
				setElapsedTime((t) => t + 1);
			}, 1000);
		} else if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [isStarted, isCompleted]);

	// Reset timer when game is not started
	useEffect(() => {
		if (!isStarted) setElapsedTime(0);
	}, [isStarted]);

	// Format time function
	const formatTime = useCallback((seconds: number): string => {
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
	}, []);

	return { elapsedTime, formatTime };
}
