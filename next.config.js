module.exports = {
	pageExtensions: ['page.tsx', 'm.ts', 'page.jsx', 'm.js'],

	async redirects() {
		return [
			{
				source: '/',
				destination: '/published-elsewhere',
				permanent: false,
			},
		]
	},
}
