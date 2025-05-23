"use client";
import Board from "../components/board/Board";
import { BoardContextProvider } from "../context/BoardContext";

export default function Home() {
	return (
		<BoardContextProvider>
			<Board />
		</BoardContextProvider>
	);
}
