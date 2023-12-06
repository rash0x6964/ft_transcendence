/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode:false,
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	  },
	images: {
		unoptimized:true,
	  remotePatterns: [
		{
		  protocol: "https",
		  hostname: "**",
		},
	  ],
	},
  };

module.exports = nextConfig
