import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: "/robots.txt",
				headers: [{ key: "Content-Type", value: "text/plain" }],
			},
			{
				source: "/opengraph-image.png",
				headers: [
					{ key: "Content-Type", value: "image/png" },
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/logo.png",
				headers: [
					{ key: "Content-Type", value: "image/png" },
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},
};

export default nextConfig;
