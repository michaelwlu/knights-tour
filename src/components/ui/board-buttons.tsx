import { cn } from "@/lib/utils";
import * as React from "react";

const squareBase =
	"aspect-square rounded-none p-0 inline-flex items-center justify-center font-bold transition-all disabled:pointer-events-none disabled:opacity-50 text-lg";

export const UnvisitedSquareButton = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, style, ...props }, ref) => (
	<button
		ref={ref}
		className={cn(
			squareBase,
			"bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-black dark:text-white",
			className
		)}
		style={style}
		{...props}
	/>
));
UnvisitedSquareButton.displayName = "UnvisitedSquareButton";

export const LastMoveSquareButton = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, style, ...props }, ref) => (
	<button
		ref={ref}
		className={cn(
			squareBase,
			"bg-amber-200 dark:bg-amber-800 hover:bg-amber-400 dark:hover:bg-amber-700 text-black dark:text-amber-100",
			className
		)}
		style={style}
		{...props}
	/>
));
LastMoveSquareButton.displayName = "LastMoveSquareButton";

export const DeadEndSquareButton = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, style, ...props }, ref) => (
	<button
		ref={ref}
		className={cn(
			squareBase,
			"bg-red-200 dark:bg-red-900 hover:bg-red-300 dark:hover:bg-red-800 text-red-900 dark:text-red-100",
			className
		)}
		style={style}
		{...props}
	/>
));
DeadEndSquareButton.displayName = "DeadEndSquareButton";

export const VisitedSquareButton = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, style, ...props }, ref) => (
	<button
		ref={ref}
		className={cn(
			squareBase,
			"bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-gray-900 dark:text-gray-100",
			className
		)}
		style={style}
		{...props}
	/>
));
VisitedSquareButton.displayName = "VisitedSquareButton";

export const ValidMoveSquareButton = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, style, ...props }, ref) => (
	<button
		ref={ref}
		className={cn(
			squareBase,
			"bg-amber-100 dark:bg-amber-950 hover:bg-amber-300 dark:hover:bg-amber-900 text-black dark:text-amber-100",
			className
		)}
		style={style}
		{...props}
	/>
));

ValidMoveSquareButton.displayName = "ValidMoveSquareButton";

export const CompletedBoardSquareButton = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, style, ...props }, ref) => (
	<button
		ref={ref}
		className={cn(
			squareBase,
			"bg-green-200 dark:bg-green-900 hover:bg-green-300 dark:hover:bg-green-800 text-gray-900 dark:text-green-100",
			className
		)}
		style={style}
		{...props}
	/>
));
CompletedBoardSquareButton.displayName = "CompletedBoardSquareButton";
