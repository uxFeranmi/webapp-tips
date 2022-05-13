const secureRoute = async (req, res, next) => {
	try {
		if (process.env.NODE_ENV === 'production') {
			if (req.header('x-forwarded-proto') !== 'https') {
				res.redirect(`https://${req.header('host')}${req.originalUrl}`);
				return;
			}
		}
		next();
	} catch (error) {
		console.log(error);
		next(error);
	}
};

module.exports = secureRoute;
