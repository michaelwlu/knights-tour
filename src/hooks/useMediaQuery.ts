import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);

		// Initial check
		setMatches(mediaQuery.matches);

		// Listen for changes
		const handleChange = (e: MediaQueryListEvent) => {
			setMatches(e.matches);
		};

		// Modern browsers
		mediaQuery.addEventListener("change", handleChange);

		// Clean up
		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, [query]);

	return matches;
}
