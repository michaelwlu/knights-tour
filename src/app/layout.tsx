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

export async function generateMetadata(): Promise<Metadata> {
	const productionUrl = new URL("https://knightstour.michaelw.lu");

	return {
		title: "Knight's Tour",
		description:
			"Guide a chess knight to visit every square in this classic puzzle",
		metadataBase: productionUrl,
		authors: [
			{
				name: "Michael W. Lu",
				url: "https://michaelw.lu",
			},
		],
		creator: "Michael W. Lu",
		icons: {
			icon: `${productionUrl.origin}/logo.png`,
		},
		openGraph: {
			title: "Knight's Tour",
			description:
				"Guide a chess knight to visit every square in this classic puzzle",
			type: "website",
			url: productionUrl.href,
			siteName: "Knight's Tour",
			locale: "en_US",
			images: [
				{
					url: `${productionUrl.origin}/opengraph-image.png`,
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
				"Guide a chess knight to visit every square in this classic puzzle",
			images: [`${productionUrl.origin}/opengraph-image.png`],
		},
		alternates: {
			canonical: productionUrl.href,
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
					<div className="app-shell relative h-[100svh] overflow-hidden px-4 py-2 md:px-6 md:py-4">
						{children}
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
