// import { getSendcashStatus } from '@/services/server/sendcash-status';
const { Git } = require('git-interface');
const path = require('path');
const gitAuth = require('./git-auth');

const git = new Git({
	dir: path.join(process.cwd(), '/content-repo'),
});

export default async function handler(req, res) {
	try {
		// const status = await getSendcashStatus(req);

		if (req.headers['server-id'] !== process.env.CONTENT_SERVER_ID) {
			throw new ServerError('', 403);
		}

		const { GITHUB_USERNAME } = process.env;
		// const githubRepoUrl = `https://${GITHUB_USERNAME}:${GITHUB_ACCESS_TOKEN}@github.com/${GITHUB_USERNAME}/webapp-tips.git`;
		const githubRepoUrl = `https://github.com/${GITHUB_USERNAME}/webapp-tips.git`;
		gitAuth(`git clone ${githubRepoUrl}`);
		gitAuth('git pull');
		console.log(git.getBranchName());

		// Get list of changed files
		const lastPublishedCommitHash = ''; // Fetch from DB
		const hashOfLastCommit = await git.getHashOfLastCommit('branch-name');
		const timeOfLastCommit = await git.getTimeOfLastCommit('branch-name');

		if (hashOfLastCommit === lastPublishedCommitHash) {
			throw new ServerError('Latest commit already published.', 204, true);
		}

		if (timeOfLastCommit < lastPublishedCommitHash) {
			const message = 'Received new commit that predates an already published commit';
			throw new ServerError(message, 500, true);
		}

		const diffFileList = await git.getDiffByRevisionFileList(lastPublishedCommitHash);
		console.log(diffFileList);
		diffFileList.forEach((file) => {
			// Compile changed files, rendering to static html, (and update relevant db records)
			// Trigger update of edge cache on cloudflare
			// Handle deleted file. Unpublish the post.
			processUpdatedBlogPost(file);
		});

		setLastPublishedCommitHash(hashOfLastCommit, Date.now());

		res.status(200);
	} catch (error) {
		const errorMessage = typeof error === 'string' ? error : error?.message;
		res.status(error.status || 500).json({ message: errorMessage });
	}
}
