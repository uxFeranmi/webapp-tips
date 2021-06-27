module.exports = {
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
