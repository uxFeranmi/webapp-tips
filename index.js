require('dotenv').config();

const nextJS = require('next');
const express = require('express');

const path = require('path');
const url = require('url');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const dev = process.env.NODE_ENV !== 'production';
const devHostname = process.env.HEROKU_APP_NAME ? `${process.env.HEROKU_APP_NAME}.herokuapp.com` : 'localhost';
const hostname = process.env.NODE_ENV === 'production'
	? 'webapp.tips'
	: devHostname;
const port = process.env.PORT || 5100;

console.log({ hostname });

const app = express();
const nextApp = nextJS({
	dev,
	hostname,
	port,
	dir: process.cwd(), // Path to next app
	quiet: false, // Boolean - Hide error messages containing server information. Defaults to false
	// conf: {}, object - The same object you would use in next.config.js. Defaults to {}
});
const nextHandler = nextApp.getRequestHandler();


app.locals.isActiveNavigation = (link, meta) => {
	const navPath = typeof link === 'string' ? link : link.path;

	let matches = navPath === '/'
		? navPath === meta.path
		: meta.path.startsWith(navPath);

	if (matches) return true;

	if (link.matches) {
		for (let i = 0; i < link.matches.length; i++) {
			const currentPath = link.matches[i];
			if (currentPath === '/') {
				if (currentPath === meta.path) matches = true;
			} else if (meta.path.startsWith(currentPath)) {
				matches = true;
			}
		}
	}

	return matches;
};

app.use(compression());

const serveStatic = (filePath) => {
	const options = {
		etag: true,
		lastModified: true,
	};
	return express.static(path.join(__dirname, filePath), options);
};

app.use(serveStatic('/public/service-worker'));
app.use(serveStatic('/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * Limit each IP to 200 requests for every 10 minutes.
 * Which translates to an average rate of 20 requests per minute, over each 10 minute period.
 * Static files are exempted.
 * ---
 * Enabling 'trust proxy' for compatibility with reverse proxy systems (Heroku, Bluemix, AWS ELB or API Gateway, Nginx, etc).
 * See https://expressjs.com/en/guide/behind-proxies.html
 */
app.set('trust proxy', 1);
app.use(rateLimit({
	windowMs: 10 * 60 * 1000,

	max: (req) => {
		if (process.env.NODE_ENV !== 'production') return 2500;
		else return 200;
	},

	message: 'Too many requests from this IP, please try again after an hour.',

	// Custom handler for requests that have exceeded the rate limit.
	// https://github.com/nfriedly/express-rate-limit#handler
	// handler: (req, res, next, options) => {
	// 	res.status(options.statusCode).send(options.message);
	// },

	// Skip rate limiting.
	// skip: (req) => {
	// 	return 'if user has reason to exceed limit';
	// },
}));

app.use(require('./utils/server/middleware/force-https'));

/**
 * `prepare()` is asynchronous, so any middleware added after the Next.js handler
 * must be in this block, to ensure they're called in the right order.
 */
nextApp.prepare().then(() => {
	app.use(async (req, res, next) => {
		try {
			const parsedUrl = url.parse(req.url, true);
			await nextHandler(req, res, parsedUrl);
		} catch (error) {
			console.log({ error });
			next(error);
		}
	});

	app.use(require('./utils/server/middleware/error'));

	app.listen(port, () => console.log(`WA.T app listening on port ${port}!`));
});
