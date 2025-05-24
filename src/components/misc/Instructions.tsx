import { useMediaQuery } from "@/hooks/useMediaQuery";
import { GITHUB_URL, WIKIPEDIA_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ExternalLink, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

const Instructions = () => {
	// Default to "Click" and update based on media query
	const [actionWord, setActionWord] = useState("Click");
	// Match mobile devices (screen width less than 768px)
	const isMobile = useMediaQuery("(max-width: 767px)");

	// Update action word when media query changes
	useEffect(() => {
		setActionWord(isMobile ? "Tap" : "Click");
	}, [isMobile]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost">
					<HelpCircle className="h-[1.2rem] w-[1.2rem]" />
					<span className="sr-only">How to Play</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader className="text-left">
					<DialogTitle className="text-2xl">How to Play</DialogTitle>
				</DialogHeader>
				<div className="mt-1 space-y-6">
					<ul className="space-y-3 text-base text-foreground/80">
						<li className={cn("flex items-start gap-2")}>
							<div className="rounded-full bg-amber-200 dark:bg-amber-800 w-5 h-5 mt-0.5 flex-shrink-0" />
							<span>
								{actionWord} any square to start. The knight will move there.
							</span>
						</li>
						<li className={cn("flex items-start gap-2")}>
							<div className="rounded-full bg-zinc-200 dark:bg-zinc-700 w-5 h-5 mt-0.5 flex-shrink-0" />
							<span>Each square can only be visited once.</span>
						</li>
						<li className={cn("flex items-start gap-2")}>
							<div className="rounded-full bg-amber-200 dark:bg-amber-800 w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center text-xs font-bold">
								3
							</div>
							<span>Numbers in squares show the order of your moves.</span>
						</li>
						<li className={cn("flex items-start gap-2")}>
							<div className="rounded-full bg-red-200 dark:bg-red-900 w-5 h-5 mt-0.5 flex-shrink-0" />
							<span>Red indicates a dead end with no valid moves left.</span>
						</li>
						<li className={cn("flex items-start gap-2")}>
							<span className="font-medium">⚙️</span>
							<span>
								Set board size and difficulty using the controls at the top.
							</span>
						</li>
						<li className={cn("flex items-start gap-2")}>
							<span className="font-medium">↩️</span>
							<span>
								{actionWord} the last square or the Undo button to undo your
								move (if enabled).
							</span>
						</li>
						<li className={cn("flex items-start gap-2")}>
							<span className="font-medium">🏆</span>
							<span>You win by visiting every square exactly once!</span>
						</li>
					</ul>

					<div className="flex justify-between w-full space-x-2">
						<Button asChild size="sm" variant="outline" className="flex-1/2">
							<Link
								href={WIKIPEDIA_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1"
							>
								Wikipedia
								<ExternalLink className="h-3.5 w-3.5" />
							</Link>
						</Button>
						<Button asChild size="sm" variant="outline" className="flex-1/2">
							<Link
								href={GITHUB_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1"
							>
								GitHub
								<ExternalLink className="h-3.5 w-3.5" />
							</Link>
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default Instructions;
