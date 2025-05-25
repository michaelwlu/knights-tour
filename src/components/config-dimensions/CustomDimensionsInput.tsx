import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import {
	DimensionsFormValues,
	MAX_DIMENSION,
	MIN_DIMENSION,
} from "@/hooks/useDimensionsForm";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

const CustomDimensionsInput = ({
	form,
	onSelect,
}: {
	form: UseFormReturn<DimensionsFormValues>;
	onSelect: () => void;
}) => {
	// Track focus state for each input
	const [rowsFocused, setRowsFocused] = useState(false);
	const [columnsFocused, setColumnsFocused] = useState(false);

	// When clicking on the radio button or the label, select this option
	const handleSelectCustom = () => {
		onSelect();
	};

	return (
		<div className="flex items-center w-full -my-1 space-x-3">
			<RadioGroupItem value="custom" id="custom" onClick={handleSelectCustom} />
			<Label
				htmlFor="custom"
				className="flex items-baseline justify-between w-full"
				onClick={handleSelectCustom}
			>
				<div className="flex flex-col">
					<span>Custom Size</span>
				</div>
				<Form {...form}>
					<div
						className="flex items-center space-x-2"
						onClick={(e) => e.stopPropagation()}
					>
						<FormField
							control={form.control}
							name="rows"
							render={({ field }) => (
								<FormItem className="relative w-16 space-y-0">
									<FormControl>
										<Input
											{...field}
											type="number"
											min={MIN_DIMENSION}
											max={MAX_DIMENSION}
											className={cn(
												"h-8 text-base md:text-sm",
												form.formState.errors.rows &&
													"border-red-500 focus-visible:ring-red-500"
											)}
											inputMode="numeric"
											pattern="[0-9]*"
											onFocus={(e) => {
												setRowsFocused(true);
												e.target.select();
											}}
											onBlur={() => {
												field.onBlur();
												setRowsFocused(false);
											}}
											onClick={(e) => {
												e.stopPropagation();
												onSelect();
											}}
										/>
									</FormControl>
									{rowsFocused && !form.formState.errors.rows ? (
										<div className="absolute -bottom-4.5 left-0 text-[10px] text-muted-foreground">
											{MIN_DIMENSION} - {MAX_DIMENSION}
										</div>
									) : (
										<FormMessage className="absolute -bottom-4.5 left-0 text-[10px]" />
									)}
								</FormItem>
							)}
						/>
						<span>×</span>
						<FormField
							control={form.control}
							name="columns"
							render={({ field }) => (
								<FormItem className="relative w-16 space-y-0">
									<FormControl>
										<Input
											{...field}
											type="number"
											min={MIN_DIMENSION}
											max={MAX_DIMENSION}
											className={cn(
												"h-8 text-base md:text-sm",
												form.formState.errors.columns &&
													"border-red-500 focus-visible:ring-red-500"
											)}
											inputMode="numeric"
											pattern="[0-9]*"
											onFocus={(e) => {
												setColumnsFocused(true);
												e.target.select();
											}}
											onBlur={() => {
												field.onBlur();
												setColumnsFocused(false);
											}}
											onClick={(e) => {
												e.stopPropagation();
												onSelect();
											}}
										/>
									</FormControl>
									{columnsFocused && !form.formState.errors.columns ? (
										<div className="absolute -bottom-4.5 left-0 text-[10px] text-muted-foreground">
											{MIN_DIMENSION} - {MAX_DIMENSION}
										</div>
									) : (
										<FormMessage className="absolute -bottom-4.5 left-0 text-[10px]" />
									)}
								</FormItem>
							)}
						/>
					</div>
				</Form>
			</Label>
		</div>
	);
};

export default CustomDimensionsInput;
