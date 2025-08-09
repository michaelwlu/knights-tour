import { useMediaQuery } from "@/hooks/useMediaQuery";
import { GITHUB_URL, WIKIPEDIA_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BookOpen, Code2, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

interface InstructionsProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

const Instructions = ({ open, onOpenChange }: InstructionsProps = {}) => {
	// Default to "Click" and update based on media query
	const [actionWord, setActionWord] = useState("Click");
	// Match mobile devices (screen width less than 768px)
	const isMobile = useMediaQuery("(max-width: 767px)");

	// Update action word when media query changes
	useEffect(() => {
		setActionWord(isMobile ? "Tap" : "Click");
	}, [isMobile]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button variant="ghost" size="sm" className="w-10 h-10">
					<HelpCircle className="size-5" />
					<span className="sr-only">How to Play</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader className="text-left">
					<DialogTitle className="text-2xl">How to Play</DialogTitle>
					<DialogDescription className="sr-only">
						Learn the rules and controls for playing the Knight&apos;s Tour
					</DialogDescription>
				</DialogHeader>
				<div className="mt-1 space-y-6">
					<ul className="space-y-4 text-base text-foreground/80">
						<li className={cn("flex gap-3 items-start")}>
							<div className="rounded-full bg-amber-200 dark:bg-amber-800 w-6 h-6 mt-0.5 flex-shrink-0" />
							<span>
								<strong>{actionWord} any square to start</strong> - the knight
								will move there and begin your tour
							</span>
						</li>
						<li className={cn("flex gap-3 items-start")}>
							<div className="rounded-full bg-blue-200 dark:bg-blue-800 w-6 h-6 mt-0.5 flex-shrink-0 flex items-center justify-center text-xs font-bold">
								L
							</div>
							<span>
								<strong>Knights move in L-shapes</strong> - 2 squares in one
								direction, then 1 square perpendicular
							</span>
						</li>
						<li className={cn("flex gap-3 items-start")}>
							<div className="rounded-full bg-green-200 dark:bg-green-800 w-6 h-6 mt-0.5 flex-shrink-0 flex items-center justify-center">
								<span className="text-xs font-bold">🏆</span>
							</div>
							<span>
								<strong>Goal: visit every square exactly once</strong> - each
								square can only be visited once during your tour
							</span>
						</li>
						<li className={cn("flex gap-3 items-start")}>
							<div className="rounded-full bg-amber-200 dark:bg-amber-800 w-6 h-6 mt-0.5 flex-shrink-0 flex items-center justify-center text-xs font-bold">
								3
							</div>
							<span>
								<strong>Numbers show move order</strong> - red squares indicate
								dead ends with no valid moves
							</span>
						</li>
					</ul>

					<div className="flex gap-3 justify-between w-full">
						<Button asChild size="sm" variant="outline" className="flex-1/2">
							<Link
								href={WIKIPEDIA_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="flex gap-1 items-center"
							>
								<BookOpen className="h-3.5 w-3.5" />
								Wikipedia
							</Link>
						</Button>
						<Button asChild size="sm" variant="outline" className="flex-1/2">
							<Link
								href={GITHUB_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="flex gap-1 items-center"
							>
								<Code2 className="h-3.5 w-3.5" />
								View Source
							</Link>
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default Instructions;
