"use client";
import { BoardProvider } from "@/context/BoardContext";
import App from "../components/App";
export default function Home() {
	return (
		<BoardProvider>
			<App />
		</BoardProvider>
	);
}
