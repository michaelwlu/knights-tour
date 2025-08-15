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
			"Guide a chess knight to visit every square in this classic puzzle",
		metadataBase: baseUrl,
		authors: [
			{
				name: "Michael W. Lu",
				url: "https://michaelw.lu",
			},
		],
		creator: "Michael W. Lu",
		icons: {
			icon: "/logo.png",
		},
		openGraph: {
			title: "Knight's Tour",
			description:
				"Guide a chess knight to visit every square in this classic puzzle",
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
		other: {
			"og:logo": "/logo.png",
		},
		twitter: {
			card: "summary_large_image",
			title: "Knight's Tour",
			description:
				"Guide a chess knight to visit every square in this classic puzzle",
			images: ["/opengraph-image.png"],
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
