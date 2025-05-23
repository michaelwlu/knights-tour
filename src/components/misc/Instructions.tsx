import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Instructions = () => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">
					<HelpCircle />
					<span className="sr-only">How to Play</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80" align="center">
				<div className="space-y-2">
					<h2 className="font-medium text-lg">How to Play</h2>

					<ul className="space-y-2 text-sm">
						<li className={cn("flex items-start gap-2")}>
							<div className="rounded-full bg-amber-200 dark:bg-amber-800 w-5 h-5 mt-0.5 flex-shrink-0" />
							<span>
								Click any square to start. The knight will move there.
							</span>
						</li>
						<li className={cn("flex items-start gap-2")}>
							<div className="rounded-full bg-amber-100 dark:bg-amber-950 w-5 h-5 mt-0.5 flex-shrink-0" />
							<span>Valid moves are highlighted (can be toggled).</span>
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
							<span className="font-medium">↩️</span>
							<span>
								Click the last moved square or the Undo button to undo your
								move.
							</span>
						</li>
						<li className={cn("flex items-start gap-2")}>
							<span className="font-medium">🏆</span>
							<span>You win by visiting every square exactly once!</span>
						</li>
					</ul>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default Instructions;
