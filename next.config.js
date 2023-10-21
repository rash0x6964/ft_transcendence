/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode:false,
	output:"export",
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
