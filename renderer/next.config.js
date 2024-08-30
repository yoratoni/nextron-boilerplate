/** @type {import("next").NextConfig} */
module.exports = {
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
	webpack: config => config,
	// biome-ignore lint/suspicious/useAwait: Next.js redirects are async by design
	async redirects() {
		return [
			{
				source: "/home",
				destination: "/",
				permanent: true,
			},
		]
	},
	reactStrictMode: true,
	swcMinify: true,
}
