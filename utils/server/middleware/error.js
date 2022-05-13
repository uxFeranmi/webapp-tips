const meta = {
	title: 'Error',
};

module.exports = async (error, req, res, next) => {
	console.error(error);

	meta.path = req.path;

	if (res.headersSent) {
		return next(error);
	}

	if (error.status) res.status(error.status);

	// Handle API response first.
	if (true || req.path.startsWith('/api/')) {
		res.json({
			error: error.message,
		});
		return;
	}

	// If it's not an API request, render appropriate error page.
	switch (error.status) {
		case 404:
			res.render('error404', {
				meta,
				globals,
			});
			break;
		case 401:
			res.redirect(`/auth/login?callbackUrl=${req.originalUrl}`);
			break;
		default:
			res.render('error', {
				meta,
				globals,
				error: {
					...error,
					message: error.message,
				},
			});
			break;
	}
};
