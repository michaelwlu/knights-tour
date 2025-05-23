"use client";
import App from "../components/App";
import { BoardContextProvider } from "../context/BoardContext";

export default function Home() {
	return (
		<BoardContextProvider>
			<App />
		</BoardContextProvider>
	);
}
