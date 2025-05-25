import { useBoardContext } from "@/context/BoardContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Constants for form validation
export const MIN_DIMENSION = 5;
export const MAX_DIMENSION = 12;

const DEFAULT_CUSTOM_ROWS = 5;
const DEFAULT_CUSTOM_COLUMNS = 7;

// Define form schema with Zod
const formSchema = z.object({
	rows: z.coerce
		.number()
		.min(MIN_DIMENSION, `Min ${MIN_DIMENSION}`)
		.max(MAX_DIMENSION, `Max ${MAX_DIMENSION}`),
	columns: z.coerce
		.number()
		.min(MIN_DIMENSION, `Min ${MIN_DIMENSION}`)
		.max(MAX_DIMENSION, `Max ${MAX_DIMENSION}`),
});

export type DimensionsFormValues = z.infer<typeof formSchema>;

export function useDimensionsForm(open: boolean) {
	const { boardDimensions, isCustomBoard } = useBoardContext();

	// Initialize the form with React Hook Form
	const form = useForm<DimensionsFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			rows: isCustomBoard ? boardDimensions.rows : DEFAULT_CUSTOM_ROWS,
			columns: isCustomBoard ? boardDimensions.columns : DEFAULT_CUSTOM_COLUMNS,
		},
		mode: "onChange",
	});

	const isValid = form.formState.isValid;

	// Update form values when board dimensions change OR when dialog opens
	useEffect(() => {
		// When dialog opens and we have a custom board, reset with current dimensions
		if (open) {
			if (isCustomBoard) {
				form.reset({
					rows: boardDimensions.rows,
					columns: boardDimensions.columns,
				});
			} else if (!form.formState.isValid) {
				// If not custom, reset to default values
				form.reset({
					rows: DEFAULT_CUSTOM_ROWS,
					columns: DEFAULT_CUSTOM_COLUMNS,
				});
			}
		}
	}, [
		open,
		isCustomBoard,
		boardDimensions.rows,
		boardDimensions.columns,
		form,
	]);

	return {
		form,
		isValid,
		getValues: form.getValues,
	};
}
