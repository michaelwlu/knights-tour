import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
	const headersList = await headers();
	const host =
		headersList.get("x-forwarded-host") ||
		headersList.get("host") ||
		"knightstour.michaelw.lu";
	const protocol = headersList.get("x-forwarded-proto") || "https";
	const baseUrl = new URL(`${protocol}://${host}`);

	return {
		title: "Knight's Tour",
		description:
			"A chess puzzle where you move a knight to visit every square on the board exactly once",
		metadataBase: baseUrl,
		authors: [
			{
				name: "Michael W. Lu",
				url: "https://michaelw.lu",
			},
		],
		creator: "Michael W. Lu",
		icons: {
			icon: "/icon.svg",
		},
		openGraph: {
			title: "Knight's Tour",
			description:
				"A chess puzzle where you move a knight to visit every square on the board exactly once",
			type: "website",
			url: baseUrl.toString(),
			siteName: "Knight's Tour",
			locale: "en_US",
			images: [
				{
					url: "/opengraph-image.png",
					width: 1200,
					height: 630,
					alt: "Knight's Tour - A chess puzzle game",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: "Knight's Tour",
			description:
				"A chess puzzle where you move a knight to visit every square on the board exactly once",
			images: ["/twitter-image.png"],
		},
	};
}

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
