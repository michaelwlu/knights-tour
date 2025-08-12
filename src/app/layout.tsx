import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Knight's Tour",
	description:
		"A chess puzzle where you move a knight to visit every square on the board exactly once",
	metadataBase: new URL("https://knightstour.michaelw.lu"),
	icons: {
		icon: "/icon.svg",
	},
	openGraph: {
		title: "Knight's Tour",
		description:
			"A chess puzzle where you move a knight to visit every square on the board exactly once",
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Knight's Tour",
		description:
			"A chess puzzle where you move a knight to visit every square on the board exactly once",
		images: ["/og.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head></head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="h-[100svh] overflow-hidden px-4 py-2 md:px-6 md:py-4">
						{children}
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
